import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { BootcampDetailComponent } from './bootcamp-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockBootcamp1, mockCapacity1, mockPaginatedBootcampResult } from 'src/app/testing/mock-data';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PATHS } from 'src/app/util/paths.constants';
import { CONTROL_RESPONSES } from 'src/app/util/control-responses.constants';

describe('BootcampDetailComponent', () => {
  let component: BootcampDetailComponent;
  let fixture: ComponentFixture<BootcampDetailComponent>;
  let bootcampService: jasmine.SpyObj<BootcampService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const bootcampServiceSpy = jasmine.createSpyObj('BootcampService', ['loadBootcamps', 'getBootcampById', 'getCapacities', 'createBootcamp', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redirectToLogin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BootcampDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: BootcampService, useValue: bootcampServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BootcampDetailComponent);
    component = fixture.componentInstance;
    bootcampService = TestBed.inject(BootcampService) as jasmine.SpyObj<BootcampService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    bootcampService.loadBootcamps.and.returnValue(of(mockPaginatedBootcampResult));
    bootcampService.getBootcampById.and.returnValue(of(mockBootcamp1));
    bootcampService.getCapacities.and.returnValue(of([mockCapacity1]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bootcamp and capacities on init', () => {
    expect(bootcampService.loadBootcamps).toHaveBeenCalled();
    expect(bootcampService.getBootcampById).toHaveBeenCalledWith(1);
    expect(bootcampService.getCapacities).toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.bootcamp).toEqual(mockBootcamp1);
    expect(component.capacities).toEqual([mockCapacity1]);
    expect(component.formData.options).toEqual([mockCapacity1]);

    const mockError = new HttpErrorResponse({
      error: new Error('Error loading bootcamp'),
      status: 500,
      statusText: 'Internal Server Error'
    });

    bootcampService.loadBootcamps.and.returnValue(of(mockPaginatedBootcampResult));
    bootcampService.getBootcampById.and.returnValue(throwError(mockError));
    bootcampService.getCapacities.and.returnValue(of([mockCapacity1]));

    spyOn(console, 'error');

    component.ngOnInit();

    expect(bootcampService.loadBootcamps).toHaveBeenCalled();
    expect(bootcampService.getBootcampById).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it('should open create modal', () => {
    expect(component.isModalFormOpen).toBeFalse();

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeTrue();
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
    const mockError = new HttpErrorResponse({
      error: new Error('Error creating bootcamp'),
      status: 500,
      statusText: 'Internal Server Error'
    });
    const mockFormData = { name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };

    bootcampService.createBootcamp.and.returnValue(throwError(mockError));
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

  it('should navigate, close the modal, and refresh data on close status modal', () => {
    component.status = { message: "Another message", status_svg: '' };

    component.onCloseStatusModal();

    expect(router.navigate).toHaveBeenCalledWith([PATHS.BOOTCAMP]);
    expect(component.isModalStatusOpen).toBeFalse();
    expect(bootcampService.refreshData).toHaveBeenCalled();
  });
});