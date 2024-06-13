import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BootcampService } from './bootcamp.service';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { environment } from 'src/environments/environment';
import { of, take } from 'rxjs';
import { mockBootcamp1, mockBootcamp2, mockBootcamp3, mockCapacity1, mockCapacity2, mockCapacity3 } from 'src/app/testing/mock-data';
import { Capacity } from 'src/app/interfaces/capacity.interface';

describe('BootcampService', () => {
  let service: BootcampService;
  let httpMock: HttpTestingController;
  let dummyBootcamps: Bootcamp[] = [];
  let dummyResult: PaginatedResult<Bootcamp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BootcampService]
    });
    service = TestBed.inject(BootcampService);
    httpMock = TestBed.inject(HttpTestingController);

    service['bootcamps'] = [mockBootcamp1, mockBootcamp2, mockBootcamp3];

    dummyBootcamps = [mockBootcamp1, mockBootcamp2, mockBootcamp3];

    dummyResult = {
      content: dummyBootcamps,
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


  it('should load bootcamps', () => {
    spyOn(service, 'loadBootcamps').and.returnValue(of({
      content: [],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0
    }));

    (service.loadBootcamps as jasmine.Spy).and.returnValue(of(dummyResult));
    service.loadBootcamps().subscribe(result => {
      expect(result).toEqual(dummyResult);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bootcamp/?page=0&size=10&isAscending=true&isOrderByName=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResult);
    expect(service.bootcamps).toEqual(dummyBootcamps);
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

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bootcamp/?page=0&size=10&isAscending=true`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyResult);

    expect(service.dataSubject.next).toHaveBeenCalledWith(dummyResult);
    expect(service.bootcamps).toEqual(dummyBootcamps);
  });


  it('should create a bootcamp', () => {
    const dummyBootcamp: Bootcamp = mockBootcamp1;

    service.createBootcamp(dummyBootcamp).subscribe(bootcamp => {
      expect(bootcamp).toEqual(dummyBootcamp);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bootcamp/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyBootcamp);
  });

  it('should return a bootcamp by id', () => {
    const dummyBootcamp: Bootcamp = mockBootcamp1;

    service.getBootcampById(1).subscribe(bootcamp => {
      expect(bootcamp).toEqual(dummyBootcamp);
    });

    service.getBootcampObservable().subscribe(bootcamp => {
      expect(bootcamp).toEqual(dummyBootcamp);
    });
  });

  it('should return an error if bootcamp by id is not found', () => {
    service.getBootcampById(999).subscribe(
      () => fail('should have failed with the error'),
      (error: Error) => {
        expect(error.message).toContain('Bootcamp with id 999 not found');
      }
    );
  });

  it('should get bootcamp observable', () => {
    const dummyBootcamp: Bootcamp = mockBootcamp1;

    let receivedBootcamp: Bootcamp | undefined;
    service.getBootcampObservable().pipe(take(1)).subscribe(bootcamp => {
      receivedBootcamp = bootcamp;
    });

    service.bootcampSubject.next(dummyBootcamp);

    expect(receivedBootcamp).toEqual(dummyBootcamp);
  });

  it('should get capacities', () => {
    const dummyCapacities: Capacity[] = [mockCapacity1, mockCapacity2, mockCapacity3];

    service.getCapacities().subscribe(capacities => {
      expect(capacities).toEqual(dummyCapacities);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/capacity/total_body`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyCapacities);
  });
});