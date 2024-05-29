import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CapacitiesComponent } from './capacities.component';
import { mockTechnology1, mockTechnology2, mockTechnology3, mockPaginatedCapacityResult } from 'src/app/testing/mock-data';
import { CapacityService } from 'src/app/services/capacity/capacity.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';


describe('CapacitiesComponent', () => {
  let component: CapacitiesComponent;
  let fixture: ComponentFixture<CapacitiesComponent>;
  let capacityService: jasmine.SpyObj<CapacityService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const capacityServiceSpy = jasmine.createSpyObj('CapacityService', ['getTechnologies', 'getPaginationState', 'updatePage', 'updateSize', 'updateOrder', 'updateOrderBy', 'createCapacity', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [CapacitiesComponent],
      providers: [
        { provide: CapacityService, useValue: capacityServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(CapacitiesComponent);
    component = fixture.componentInstance;
    capacityService = TestBed.inject(CapacityService) as jasmine.SpyObj<CapacityService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    Object.defineProperty(capacityService, 'data$', { value: of(mockPaginatedCapacityResult) });
    capacityService.getTechnologies.and.returnValue(of([mockTechnology1, mockTechnology2, mockTechnology3]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize technologies', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.technologies).toEqual([mockTechnology1, mockTechnology2, mockTechnology3]);
    expect(component.formData.options).toEqual([mockTechnology1, mockTechnology2, mockTechnology3]);
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


  it('should close the modal and refresh data on close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
  });
});