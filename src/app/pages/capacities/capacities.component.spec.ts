import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CapacitiesComponent } from './capacities.component';
import { mockTechnology1, mockTechnology2, mockTechnology3, mockPaginatedCapacityResult } from 'src/app/testing/mock-data';
import { CapacityService } from 'src/app/services/capacity/capacity.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PATHS } from 'src/app/util/paths.constants';
import { CONTROL_RESPONSES } from 'src/app/util/control-responses.constants';

describe('CapacitiesComponent', () => {
  let component: CapacitiesComponent;
  let fixture: ComponentFixture<CapacitiesComponent>;
  let capacityService: jasmine.SpyObj<CapacityService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const capacityServiceSpy = jasmine.createSpyObj('CapacityService', ['getTechnologies', 'getPaginationState', 'updatePage', 'updateSize', 'updateOrder', 'updateOrderBy', 'createCapacity', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redirectToLogin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [CapacitiesComponent],
      providers: [
        { provide: CapacityService, useValue: capacityServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(CapacitiesComponent);
    component = fixture.componentInstance;
    capacityService = TestBed.inject(CapacityService) as jasmine.SpyObj<CapacityService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    Object.defineProperty(capacityService, 'data$', { value: of(mockPaginatedCapacityResult) });
    capacityService.getTechnologies.and.returnValue(of([mockTechnology1, mockTechnology2, mockTechnology3]));
    capacityService.getPaginationState.and.returnValue(of({ page: 0, size: 10, orderBy: true, isAscending: true }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize capacities and technologies', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.capacities).toEqual(mockPaginatedCapacityResult.content);
    expect(component.technologies).toEqual([mockTechnology1, mockTechnology2, mockTechnology3]);
    expect(component.totalPages).toEqual(mockPaginatedCapacityResult.totalPages);
    expect(component.currentPage).toEqual(mockPaginatedCapacityResult.pageNumber);
  });

  it('should update page', () => {
    const newPage = 2;
    component.onPageChange(newPage);
    expect(capacityService.updatePage).toHaveBeenCalledWith(newPage);
  });

  it('should update size', () => {
    const newSize = 20;
    component.onSizeChange(newSize);
    expect(capacityService.updateSize).toHaveBeenCalledWith(newSize);
  });

  it('should update order', () => {
    const newAscending = true;
    component.onAscendingChange(newAscending);
    expect(capacityService.updateOrder).toHaveBeenCalledWith(newAscending);
  });

  it('should update order by', () => {
    const newOrderBy = false;
    component.onOrderByChange(newOrderBy);
    expect(capacityService.updateOrderBy).toHaveBeenCalledWith(newOrderBy);
  });

  it('should open create modal', () => {
    expect(component.isModalFormOpen).toBeFalse();

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeTrue();
  });

  it('should handle form submission successfully', () => {
    const mockNewCapacity = { id: 5, name: 'New Capacity', description: 'New description', technologies: [mockTechnology1] };
    const mockFormData = { name: 'New Capacity', description: 'New description', technologies: [mockTechnology1] };

    capacityService.createCapacity.and.returnValue(of(mockNewCapacity));
    statusMessagesService.handleSuccess.and.returnValue({ message: '¡Capacidad creada!', status_svg: 'success' });

    component.onFormSubmit(mockFormData);

    expect(capacityService.createCapacity).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: '¡Capacidad creada!', status_svg: 'success' });
    expect(statusMessagesService.handleSuccess).toHaveBeenCalledWith(mockNewCapacity, "¡Capacidad creada!");
  });

  it('should handle form submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error creating capacity', status: 500 });
    const mockFormData = { name: 'New Capacity', description: 'New description', technologies: [mockTechnology1] };

    capacityService.createCapacity.and.returnValue(throwError(mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Error creating capacity', status_svg: 'error' });

    component.onFormSubmit(mockFormData);

    expect(capacityService.createCapacity).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Error creating capacity', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError, "una capacidad");
  });
  
  it('should redirect to login if session expired message is shown', () => {
    component.status = { message: CONTROL_RESPONSES.SESSION_EXPIRED, status_svg: '' };

    component.onCloseStatusModal();

    expect(authService.redirectToLogin).toHaveBeenCalled();
  });

  it('should close the modal and refresh data on close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
    expect(capacityService.refreshData).toHaveBeenCalled();
  });

  it('should navigate to capacity detail', () => {
    const capacityId = 1;
    component.onNavigateToDetail(capacityId);
    expect(router.navigate).toHaveBeenCalledWith([PATHS.CAPACITY, capacityId]);
  });
});