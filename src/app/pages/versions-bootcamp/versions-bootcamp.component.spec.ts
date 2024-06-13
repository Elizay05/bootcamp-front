import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { VersionsBootcampComponent } from './versions-bootcamp.component';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { VersionBootcampService } from 'src/app/services/version-bootcamp/version-bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mockBootcamp1, mockCapacity1, mockPaginatedBootcampResult, mockVersionBootcamp1 } from 'src/app/testing/mock-data';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { VersionBootcamp } from 'src/app/interfaces/version-bootcamp.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PATHS } from 'src/app/util/paths.constants';
import { CONTROL_RESPONSES } from 'src/app/util/control-responses.constants';
import { DateFormatService } from 'src/app/services/date-format/date-format.service';

describe('VersionsBootcampComponent', () => {
  let component: VersionsBootcampComponent;
  let fixture: ComponentFixture<VersionsBootcampComponent>;
  let bootcampService: jasmine.SpyObj<BootcampService>;
  let versionBootcampService: jasmine.SpyObj<VersionBootcampService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let dateFormatService: jasmine.SpyObj<DateFormatService>;
  let router: jasmine.SpyObj<Router>;

  const mockPaginationState = new BehaviorSubject({
    size: 10,
    orderBy: true,
    isAscending: true,
    page: 0,
    bootcampName: 'Bootcamp 1'
  });

  beforeEach(async () => {
    const bootcampServiceSpy = jasmine.createSpyObj('BootcampService', [
      'loadBootcamps',
      'getBootcampById',
      'getCapacities',
      'createBootcamp'
    ]);
    const versionBootcampServiceSpy = jasmine.createSpyObj('VersionBootcampService', [
      'createVersionBootcamp',
      'refreshData',
      'updatePage',
      'updateSize',
      'updateOrder',
      'updateOrderBy',
      'getPaginationState'
    ]);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redirectToLogin']);
    const dateFormatServiceSpy = jasmine.createSpyObj('DateFormatService', ['formatDateToSemester']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [VersionsBootcampComponent],
      providers: [
        { provide: BootcampService, useValue: bootcampServiceSpy },
        { provide: VersionBootcampService, useValue: versionBootcampServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DateFormatService, useValue: dateFormatServiceSpy },
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

    fixture = TestBed.createComponent(VersionsBootcampComponent);
    component = fixture.componentInstance;
    bootcampService = TestBed.inject(BootcampService) as jasmine.SpyObj<BootcampService>;
    versionBootcampService = TestBed.inject(VersionBootcampService) as jasmine.SpyObj<VersionBootcampService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dateFormatService = TestBed.inject(DateFormatService) as jasmine.SpyObj<DateFormatService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    Object.defineProperty(versionBootcampService, 'data$', { value: of([mockVersionBootcamp1]) });
    Object.defineProperty(versionBootcampService, 'paginationState', { value: mockPaginationState });
    versionBootcampService.getPaginationState.and.returnValue(mockPaginationState.asObservable());

    bootcampService.loadBootcamps.and.returnValue(of(mockPaginatedBootcampResult));
    bootcampService.getBootcampById.and.returnValue(of(mockBootcamp1));
    bootcampService.getCapacities.and.returnValue(of([mockCapacity1]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load bootcamp data', () => {
    component.ngOnInit();

    expect(bootcampService.loadBootcamps).toHaveBeenCalled();
    expect(bootcampService.getBootcampById).toHaveBeenCalledWith(1);
    expect(versionBootcampService.getPaginationState).toHaveBeenCalled();
  });

  it('should call obtainBootcampById after loading bootcamps', () => {
    const bootcampId = 1;
    spyOn(component, 'obtainBootcampById');

    component.loadBootcamps(bootcampId);

    expect(bootcampService.loadBootcamps).toHaveBeenCalled();
    expect(component.obtainBootcampById).toHaveBeenCalledWith(bootcampId);
  });

  it('should set bootcamp and update pagination state', () => {
    const bootcampId = 1;
    spyOn(versionBootcampService.paginationState, 'next');

    component.obtainBootcampById(bootcampId);

    expect(bootcampService.getBootcampById).toHaveBeenCalledWith(bootcampId);
    expect(component.bootcamp).toEqual(mockBootcamp1);
    expect(versionBootcampService.paginationState.next).toHaveBeenCalledWith({
      ...mockPaginationState.value,
      bootcampName: mockBootcamp1.name
    });
  });

  it('should update page', () => {
    const newPage = 2;
    component.onPageChange(newPage);
    expect(versionBootcampService.updatePage).toHaveBeenCalledWith(newPage);
  });

  it('should update size', () => {
    const newSize = 20;
    component.onSizeChange(newSize);
    expect(versionBootcampService.updateSize).toHaveBeenCalledWith(newSize);
  });

  it('should update order', () => {
    const newAscending = true;
    component.onAscendingChange(newAscending);
    expect(versionBootcampService.updateOrder).toHaveBeenCalledWith(newAscending);
  });

  it('should update order by', () => {
    const newOrderBy = false;
    component.onOrderByChange(newOrderBy);
    expect(versionBootcampService.updateOrderBy).toHaveBeenCalledWith(newOrderBy);
  });

  it('should format start date correctly', () => {
    const mockDate = '2024-06-01';
    const formattedDate = '2024-1';

    dateFormatService.formatDateToSemester.and.returnValue(formattedDate);

    const result = component.getFormattedStartDate(mockDate);

    expect(dateFormatService.formatDateToSemester).toHaveBeenCalledWith(mockDate);
    expect(result).toBe(formattedDate);
  });


  it('should open create version modal', () => {
    expect(component.isModalVersionFormOpen).toBeFalse();

    component.openCreateVersionModal();

    expect(component.isModalVersionFormOpen).toBeTrue();
  });

  it('should open create modal', () => {
    expect(component.isModalFormOpen).toBeFalse();

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeTrue();
  });

  it('should handle form submission successfully', () => {
    const mockNewBootcamp: Bootcamp = { id: 5, name: 'New Bootcamp', description: 'New description', capacities: [] };
    const mockFormData = { name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };

    bootcampService.createBootcamp.and.returnValue(of(mockNewBootcamp));
    statusMessagesService.handleSuccess.and.returnValue({ message: '¡Bootcamp creado!', status_svg: 'success' });

    component.onFormSubmit(mockFormData);

    expect(bootcampService.createBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: '¡Bootcamp creado!', status_svg: 'success' });
    expect(statusMessagesService.handleSuccess).toHaveBeenCalledWith(mockNewBootcamp, '¡Bootcamp creado!');
  });

  it('should handle form submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error creating bootcamp', status: 500 });
    const mockFormData = { name: 'New Bootcamp', description: 'New description', capacities: [mockCapacity1] };

    bootcampService.createBootcamp.and.returnValue(throwError(mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Error creating bootcamp', status_svg: 'error' });

    component.onFormSubmit(mockFormData);

    expect(bootcampService.createBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Error creating bootcamp', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError, 'un bootcamp');
  });

  it('should handle form version submission successfully', () => {
    const mockNewVersion: VersionBootcamp = { bootcampId: 1, startDate: '2022-01-01', endDate: '2022-12-31', maximumQuota: 10 };
    const mockFormData = { bootcampId: 1, startDate: '2022-01-01', endDate: '2022-12-31', maximumQuota: 10 };

    versionBootcampService.createVersionBootcamp.and.returnValue(of(mockNewVersion));
    statusMessagesService.handleSuccess.and.returnValue({ message: '¡Versión creada!', status_svg: 'success' });

    component.bootcamp = mockBootcamp1;
    component.onFormVersionSubmit(mockFormData);

    expect(versionBootcampService.createVersionBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalVersionFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: '¡Versión creada!', status_svg: 'success' });
    expect(statusMessagesService.handleSuccess).toHaveBeenCalledWith(mockNewVersion, '¡Versión creada!');
  });

  it('should handle form version submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error creating version', status: 500 });
    const mockFormData = { bootcampId: 1, startDate: '2022-01-01', endDate: '2022-12-31', maximumQuota: 10 };

    versionBootcampService.createVersionBootcamp.and.returnValue(throwError(mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Error creating version', status_svg: 'error' });

    component.bootcamp = mockBootcamp1;
    component.onFormVersionSubmit(mockFormData);

    expect(versionBootcampService.createVersionBootcamp).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalVersionFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Error creating version', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError, 'una versión');
  });

  it('should redirect to login if session expired message is shown', () => {
    component.status = { message: CONTROL_RESPONSES.SESSION_EXPIRED, status_svg: '' };

    component.onCloseStatusModal();

    expect(authService.redirectToLogin).toHaveBeenCalled();
  });

  it('should close the modal and navigate to versions bootcamp', () => {
    component.onCloseStatusModal();
    expect(component.isModalStatusOpen).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith([PATHS.BOOTCAMP, 1, 'versions']);
  });
});