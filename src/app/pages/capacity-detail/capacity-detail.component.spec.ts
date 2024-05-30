import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacityService } from 'src/app/services/capacity/capacity.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { CapacityDetailComponent } from './capacity-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockCapacity1, mockTechnology1, mockPaginatedCapacityResult } from 'src/app/testing/mock-data';


describe('CapacityDetailComponent', () => {
  let component: CapacityDetailComponent;
  let fixture: ComponentFixture<CapacityDetailComponent>;
  let capacityService: jasmine.SpyObj<CapacityService>;

  beforeEach(async () => {
    const capacityServiceSpy = jasmine.createSpyObj('CapacityService', ['loadCapacities', 'getCapacityById', 'getTechnologies', 'createCapacity', 'refreshData']);
    const statusMessagesServiceSpy = jasmine.createSpyObj('StatusMessagesService', ['handleSuccess', 'handleError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CapacityDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CapacityService, useValue: capacityServiceSpy },
        { provide: StatusMessagesService, useValue: statusMessagesServiceSpy },
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

    fixture = TestBed.createComponent(CapacityDetailComponent);
    component = fixture.componentInstance;
    capacityService = TestBed.inject(CapacityService) as jasmine.SpyObj<CapacityService>;

    capacityService.loadCapacities.and.returnValue(of(mockPaginatedCapacityResult));
    capacityService.getCapacityById.and.returnValue(of(mockCapacity1));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load capacity on init', () => {
    expect(capacityService.loadCapacities).toHaveBeenCalled();
    expect(capacityService.getCapacityById).toHaveBeenCalledWith(1);

    fixture.detectChanges();

    expect(component.capacity).toEqual(mockCapacity1);
  });

  it('should handle error when loading capacity', () => {
    const mockError = new Error('Error loading capacity');
    
    capacityService.loadCapacities.and.returnValue(of(mockPaginatedCapacityResult));
    capacityService.getCapacityById.and.returnValue(throwError(mockError));
    capacityService.getTechnologies.and.returnValue(of([mockTechnology1]));

    spyOn(console, 'error');

    component.ngOnInit();

    expect(capacityService.loadCapacities).toHaveBeenCalled();
    expect(capacityService.getCapacityById).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
