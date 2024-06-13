import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login/login.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { AuthToken } from 'src/app/interfaces/auth-token.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PATHS } from 'src/app/util/paths.constants';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open login modal', () => {
    expect(component.isModalLoginOpen).toBeFalse();

    component.openLogin();

    expect(component.isModalLoginOpen).toBeTrue();
  });

  it('should handle form submission successfully', () => {
    const mockAuthToken: AuthToken = { token: 'mock-token' };

    loginService.login.and.returnValue(of(mockAuthToken));
    const navigateSpy = router.navigate.and.returnValue(Promise.resolve(true));

    const formData = { email: 'test@example.com', password: 'password' };
    component.onLoginSubmit(formData);

    expect(loginService.login).toHaveBeenCalledWith(formData);
    expect(localStorage.getItem('authToken')).toBe('mock-token');
    expect(component.isModalLoginOpen).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith([PATHS.START]);
  });

  it('should handle form submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Login error', status: 500 });
    const formData = { email: 'test@example.com', password: 'password' };

    loginService.login.and.returnValue(throwError(mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Login error', status_svg: 'error' });

    component.onLoginSubmit(formData);

    expect(loginService.login).toHaveBeenCalledWith(formData);
    expect(component.isModalLoginOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Login error', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError);
  });

  it('should close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
  });
});