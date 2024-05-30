import { TestBed } from '@angular/core/testing';

import { CapacityService } from './capacity.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { mockCapacity1, mockCapacity2, mockCapacity3, mockTechnology1, mockTechnology2, mockTechnology3 } from 'src/app/testing/mock-data';
import { of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from 'src/app/interfaces/technology.interface';

describe('CapacityService', () => {
  let service: CapacityService;
  let httpMock: HttpTestingController;
  let dummyCapacities: Capacity[] = [];
  let dummyResult: PaginatedResult<Capacity>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapacityService]
    });
    service = TestBed.inject(CapacityService);
    httpMock = TestBed.inject(HttpTestingController);

    service['capacities'] = [mockCapacity1, mockCapacity2, mockCapacity3];

    dummyCapacities = [mockCapacity1, mockCapacity2, mockCapacity3];

    dummyResult = {
      content: dummyCapacities,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 3,
      totalPages: 1
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should get pagination state', () => {
    const expectedState = {
      page: 0,
      size: 10,
      isAscending: true,
      orderBy: true
    };

    let currentState: any = null;

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      currentState = state;
    });

    const actualState = service['paginationState'].getValue();

    expect(currentState).toEqual(expectedState);
    expect(actualState).toEqual(expectedState);
  });

  it('should load capacities', () => {
    spyOn(service, 'loadCapacities').and.returnValue(of({
      content: [],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0
    }));

    (service.loadCapacities as jasmine.Spy).and.returnValue(of(dummyResult));
    service.loadCapacities().subscribe(result => {
      expect(result).toEqual(dummyResult);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/capacity/?page=0&size=10&isAscending=true&isOrderByName=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResult);
    expect(service.capacities).toEqual(dummyCapacities);
    expect(service.dataSubject.value).toEqual(dummyResult);
  });

  it('should update page', () => {
    const newPage = 2;
    service.updatePage(newPage);

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      expect(state.page).toEqual(newPage);
    });
  });

  it('should update size', () => {
    const newSize = 20;
    service.updateSize(newSize);

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      expect(state.size).toEqual(newSize);
      expect(state.page).toEqual(0);
    });
  });

  it('should update order', () => {
    const newOrder = false;
    service.updateOrder(newOrder);

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      expect(state.isAscending).toEqual(newOrder);
    });
  });

  it('should update orderBy', () => {
    const newOrderBy = false;
    service.updateOrderBy(newOrderBy);

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      expect(state.orderBy).toEqual(newOrderBy);
    });
  });

  it('should refresh data', () => {

    spyOn(service.dataSubject, 'next').and.callThrough();

    service.refreshData();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/capacity/?page=0&size=10&isAscending=true`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyResult);

    expect(service.dataSubject.next).toHaveBeenCalledWith(dummyResult);
    expect(service.capacities).toEqual(dummyCapacities);
  });

  it('should create a capacity', () => {
    const dummyCapacity: Capacity = mockCapacity1;

    service.createCapacity(dummyCapacity).subscribe(capacity => {
      expect(capacity).toEqual(dummyCapacity);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/capacity/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyCapacity);
  });

  it('should return a capacity by id', () => {
    const dummyCapacity: Capacity = mockCapacity1;

    service.getCapacityById(1).subscribe(capacity => {
      expect(capacity).toEqual(dummyCapacity);
    });

    service.getCapacityObservable().subscribe(capacity => {
      expect(capacity).toEqual(dummyCapacity);
    });
  });

  it('should return an error if capacity by id is not found', () => {
    service.getCapacityById(999).subscribe(
      () => fail('should have failed with the error'),
      (error: Error) => {
        expect(error.message).toContain('Capacity with id 999 not found');
      }
    );
  });

  it('should get capacity observable', () => {
    const dummyCapacity: Capacity = mockCapacity1;

    let receivedCapacity: Capacity | undefined;
    service.getCapacityObservable().pipe(take(1)).subscribe(capacity => {
      receivedCapacity = capacity;
    });

    service.capacitySubject.next(dummyCapacity);

    expect(receivedCapacity).toEqual(dummyCapacity);
  });

  it('should get technologies', () => {
    const dummyTechnologies: Technology[] = [mockTechnology1, mockTechnology2, mockTechnology3];

    service.getTechnologies().subscribe(technologies => {
      expect(technologies).toEqual(dummyTechnologies);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/technology/total_body`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyTechnologies);
  });
});
