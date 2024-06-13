import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TechnologiesComponent } from './technologies.component';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mockPaginatedTechnologyResult } from 'src/app/testing/mock-data';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CONTROL_RESPONSES } from 'src/app/util/control-responses.constants';


describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let technologyService: jasmine.SpyObj<TechnologyService>;
  let statusMessagesService: jasmine.SpyObj<StatusMessagesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const technologyServiceSpy = jasmine.createSpyObj('TechnologyService', ['getPaginationState', 'updatePage', 'updateSize', 'updateOrder', 'createTechnology', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redirectToLogin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TechnologiesComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TechnologyService, useValue: technologyServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    technologyService = TestBed.inject(TechnologyService) as jasmine.SpyObj<TechnologyService>;
    statusMessagesService = TestBed.inject(StatusMessagesService) as jasmine.SpyObj<StatusMessagesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    Object.defineProperty(technologyService, 'data$', { value: of(mockPaginatedTechnologyResult) });
    technologyService.getPaginationState.and.returnValue(of({ page: 0, size: 10, isAscending: true }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize technologies', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.technologies).toEqual(mockPaginatedTechnologyResult.content);
    expect(component.totalPages).toEqual(mockPaginatedTechnologyResult.totalPages);
    expect(component.currentPage).toEqual(mockPaginatedTechnologyResult.pageNumber);
  });

  it('should update page', () => {
    const newPage = 2;
    component.onPageChange(newPage);
    expect(technologyService.updatePage).toHaveBeenCalledWith(newPage);
  });

  it('should update size', () => {
    const newSize = 20;
    component.onSizeChange(newSize);
    expect(technologyService.updateSize).toHaveBeenCalledWith(newSize);
  });

  it('should update order', () => {
    const newAscending = true;
    component.onAscendingChange(newAscending);
    expect(technologyService.updateOrder).toHaveBeenCalledWith(newAscending);
  });

  it('should open create modal', () => {
    expect(component.isModalFormOpen).toBeFalse();

    component.openCreateModal();

    expect(component.isModalFormOpen).toBeTrue();
  });

  it('should handle form submission successfully', () => {
    const mockNewTechnology = { id: 5, name: 'New Technology', description: 'New description' };
    const mockFormData = { name: 'New Technology', description: 'New description' };

    technologyService.createTechnology.and.returnValue(of(mockNewTechnology));
    statusMessagesService.handleSuccess.and.returnValue({ message: '¡Tecnología creada!', status_svg: 'success' });

    component.onFormSubmit(mockFormData);

    expect(technologyService.createTechnology).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: '¡Tecnología creada!', status_svg: 'success' });
    expect(statusMessagesService.handleSuccess).toHaveBeenCalledWith(mockNewTechnology, "¡Tecnología creada!");
  });

  it('should handle form submission error', () => {
    const mockError = new HttpErrorResponse({ error: 'Error creating technology', status: 500 });
    const mockFormData = { name: 'New Technology', description: 'New description' };

    technologyService.createTechnology.and.returnValue(throwError(mockError));
    statusMessagesService.handleError.and.returnValue({ message: 'Error creating technology', status_svg: 'error' });

    component.onFormSubmit(mockFormData);

    expect(technologyService.createTechnology).toHaveBeenCalledWith(mockFormData);
    expect(component.isModalFormOpen).toBeFalse();
    expect(component.isModalStatusOpen).toBeTrue();
    expect(component.status).toEqual({ message: 'Error creating technology', status_svg: 'error' });
    expect(statusMessagesService.handleError).toHaveBeenCalledWith(mockError, "una tecnologia");
  });

  it('should redirect to login if session expired message is shown', () => {
    component.status = { message: CONTROL_RESPONSES.SESSION_EXPIRED, status_svg: '' };

    component.onCloseStatusModal();

    expect(authService.redirectToLogin).toHaveBeenCalled();
  });

  it('should close the modal and refresh data on close status modal', () => {
    component.onCloseStatusModal();

    expect(component.isModalStatusOpen).toBeFalse();
    expect(technologyService.refreshData).toHaveBeenCalled();
  });
});