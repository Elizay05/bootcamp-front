import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthModalComponent } from './auth-modal.component';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let router: jasmine.SpyObj<Router>;
  let authErrorSubject: Subject<boolean>;

  beforeEach(async () => {
    authErrorSubject = new Subject<boolean>();

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthError', 'clearAuthError']);
    authServiceSpy.authError$ = authErrorSubject.asObservable();

    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AuthModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    if (component.authErrorSubscription) {
      component.authErrorSubscription.unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal and handle error on auth error', () => {
    const mockError = new HttpErrorResponse({
      error: { message: 'Auth error' },
      status: 401,
      statusText: 'Unauthorized'
    });
    authService.getAuthError.and.returnValue(mockError);
    statusMessagesService.handleError.and.returnValue({ message: 'Auth error', status_svg: 'error' });

    authErrorSubject.next(true);
    fixture.detectChanges();

    expect(component.openModalAuth).toBeTrue();
    expect(authService.getAuthError).toHaveBeenCalled();
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError);
    expect(component.status).toEqual({ message: 'Auth error', status_svg: 'error' });
  });

  it('should close modal on auth success', () => {
    authErrorSubject.next(false);
    fixture.detectChanges();

    expect(component.openModalAuth).toBeFalse();
  });

  it('should close modal, clear auth error, and navigate on close modal', () => {
    component.onCloseModal();

    expect(component.openModalAuth).toBeFalse();
    expect(authService.clearAuthError).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});