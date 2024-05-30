import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BootcampsComponent } from './bootcamps.component';
import { mockCapacity1, mockCapacity2, mockCapacity3, mockPaginatedBootcampResult } from 'src/app/testing/mock-data';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PATH_BOOTCAMP } from 'src/app/util/path-variables';

describe('BootcampsComponent', () => {
  let component: BootcampsComponent;
  let fixture: ComponentFixture<BootcampsComponent>;
  let bootcampService: jasmine.SpyObj<BootcampService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bootcampServiceSpy = jasmine.createSpyObj('BootcampService', ['getCapacities', 'getPaginationState', 'updatePage', 'updateSize', 'updateOrder', 'updateOrderBy', 'createBootcamp', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [BootcampsComponent],
      providers: [
        { provide: BootcampService, useValue: bootcampServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(BootcampsComponent);
    component = fixture.componentInstance;
    bootcampService = TestBed.inject(BootcampService) as jasmine.SpyObj<BootcampService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    Object.defineProperty(bootcampService, 'data$', { value: of(mockPaginatedBootcampResult) });
    bootcampService.getCapacities.and.returnValue(of([mockCapacity1, mockCapacity2, mockCapacity3]));
    bootcampService.getPaginationState.and.returnValue(of({ page: 0, size: 10, orderBy: true, isAscending: true }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize bootcamps and capacities', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.bootcamps).toEqual(mockPaginatedBootcampResult.content);
    expect(component.capacities).toEqual([mockCapacity1, mockCapacity2, mockCapacity3]);
    expect(component.totalPages).toEqual(mockPaginatedBootcampResult.totalPages);
    expect(component.currentPage).toEqual(mockPaginatedBootcampResult.pageNumber);
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
    const mockError = new HttpErrorResponse({ error: 'Error creating bootcamp', status: 500 });
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

  it('should navigate, close the modal, and refresh data on close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
    expect(bootcampService.refreshData).toHaveBeenCalled();
  });

  it('should navigate to bootcamp detail', () => {
    const bootcampId = 1;
    component.onNavigateToDetail(bootcampId);
    expect(router.navigate).toHaveBeenCalledWith([PATH_BOOTCAMP, bootcampId]);
  });
});