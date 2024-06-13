import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { mockCapacity1, mockCapacity2, mockCapacity3 } from 'src/app/testing/mock-data';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StartComponent } from './start.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CONTROL_RESPONSES } from 'src/app/util/control-responses.constants';
import { PATHS } from 'src/app/util/paths.constants';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let bootcampService: jasmine.SpyObj<BootcampService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const bootcampServiceSpy = jasmine.createSpyObj('BootcampService', ['getCapacities', 'createBootcamp', 'updatePage', 'updateSize', 'updateOrder', 'updateOrderBy']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole', 'isLoggedIn', 'hasAnyRole', 'redirectToLogin']);
  
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      providers: [
        { provide: BootcampService, useValue: bootcampServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    bootcampService = TestBed.inject(BootcampService) as jasmine.SpyObj<BootcampService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    bootcampService.getCapacities.and.returnValue(of([mockCapacity1, mockCapacity2, mockCapacity3]));
    bootcampServiceSpy.data$ = of({ content: [], totalPages: 1, pageNumber: 0 });
    authService.isLoggedIn.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize capacities', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.capacities).toEqual([mockCapacity1, mockCapacity2, mockCapacity3]);
  });
  
  it('should update page', () => {
    const newPage = 2;
    component.onPageChange(newPage);
    expect(bootcampService.updatePage).toHaveBeenCalledWith(newPage);
  });

  it('should update size', () => {
    const newSize = 20;
    component.onSizeChange(newSize);
    expect(bootcampService.updateSize).toHaveBeenCalledWith(newSize);
  });

  it('should update order', () => {
    const newAscending = true;
    component.onAscendingChange(newAscending);
    expect(bootcampService.updateOrder).toHaveBeenCalledWith(newAscending);
  });

  it('should update order by', () => {
    const newOrderBy = false;
    component.onOrderByChange(newOrderBy);
    expect(bootcampService.updateOrderBy).toHaveBeenCalledWith(newOrderBy);
  });

  it('should open the modal if user role is ADMINISTRATOR', () => {
    authService.getUserRole.and.returnValue('ADMINISTRATOR');

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeTrue();
  });

  it('should not open the modal if user role is not ADMINISTRATOR', () => {
    authService.getUserRole.and.returnValue('USER');

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeFalse();
  });

  it('should handle form submission successfully', () => {
    const mockNewBootcamp = { id: 5, name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };
    const mockFormData = { name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };

    bootcampService.createBootcamp.and.returnValue(of(mockNewBootcamp));
    statusMessagesService.handleSuccess.and.returnValue({ message: '¡Bootcamp creado!', status_svg: 'success' });

    component.onFormSubmit(mockFormData);

    expect(bootcampService.createBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: '¡Bootcamp creado!', status_svg: 'success' });
    expect(statusMessagesService.handleSuccess).toHaveBeenCalledWith(mockNewBootcamp, "¡Bootcamp creado!");
  });

  it('should handle form submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error creating bootcamp', status: 500 });
    const mockFormData = { name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };

    bootcampService.createBootcamp.and.returnValue(throwError(() => mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Error creating bootcamp', status_svg: 'error' });

    component.onFormSubmit(mockFormData);

    expect(bootcampService.createBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Error creating bootcamp', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError, "un bootcamp");
  });

  it('should redirect to login if session expired message is shown', () => {
    component.status = { message: CONTROL_RESPONSES.SESSION_EXPIRED, status_svg: '' };

    component.onCloseStatusModal();

    expect(authService.redirectToLogin).toHaveBeenCalled();
  });

  it('should navigate and close the modal on close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith([PATHS.BOOTCAMP]);
  });

  it('should navigate to bootcamp detail', () => {
    const bootcampId = 1;
    component.onNavigateToDetail(bootcampId);
    expect(router.navigate).toHaveBeenCalledWith([PATHS.BOOTCAMP, bootcampId]);
  });

  it('should navigate to bootcamp version', () => {
    const bootcampId = 1;
    component.onNavigateToVersion(bootcampId);
    expect(router.navigate).toHaveBeenCalledWith([PATHS.BOOTCAMP, bootcampId, 'versions']);
  });
});