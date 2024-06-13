import { TestBed } from '@angular/core/testing';
import { VersionBootcampService } from './version-bootcamp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VersionBootcamp } from 'src/app/interfaces/version-bootcamp.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { mockVersionBootcamp1, mockVersionBootcamp2, mockVersionBootcamp3 } from 'src/app/testing/mock-data';
import { of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('VersionBootcampService', () => {
  let service: VersionBootcampService;
  let httpMock: HttpTestingController;
  let dummyVersionsBootcamp: VersionBootcamp[] = [];
  let dummyResult: PaginatedResult<VersionBootcamp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VersionBootcampService]
    });
    service = TestBed.inject(VersionBootcampService);
    httpMock = TestBed.inject(HttpTestingController);

    dummyVersionsBootcamp = [mockVersionBootcamp1, mockVersionBootcamp2, mockVersionBootcamp3];

    dummyResult = {
      content: dummyVersionsBootcamp,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 3,
      totalPages: 1
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pagination state', () => {
    const expectedState = {
      page: 0,
      size: 10,
      isAscending: true,
      orderBy: true,
      bootcampName: ''
    };

    let currentState: any = null;

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      currentState = state;
    });

    const actualState = service['paginationState'].getValue();

    expect(currentState).toEqual(expectedState);
    expect(actualState).toEqual(expectedState);
  });

  it('should load versions bootcamp', () => {
    spyOn(service, 'loadVersionsBootcamp').and.returnValue(of({
      content: [],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0
    }));

    (service.loadVersionsBootcamp as jasmine.Spy).and.returnValue(of(dummyResult));
    service.loadVersionsBootcamp().subscribe(result => {
      expect(result).toEqual(dummyResult);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/versionBootcamp/?page=0&size=10&isAscending=true&isOrderByStartDate=true&bootcampName=`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResult);
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
    const initialState = {
      page: 2,
      size: 20,
      isAscending: false,
      orderBy: false,
      bootcampName: 'Test Bootcamp'
    };
    
    service['paginationState'].next(initialState);

    let currentState: any = null;
    service.getPaginationState().pipe(take(1)).subscribe(state => {
      currentState = state;
    });

    expect(currentState).toEqual(initialState);

    service.refreshData();

    let refreshedState: any = null;
    service.getPaginationState().pipe(take(1)).subscribe(state => {
      refreshedState = state;
    });

    expect(refreshedState).toEqual(initialState);
  });

  it('should create a version bootcamp', () => {
    const dummyVersionBootcamp: VersionBootcamp = mockVersionBootcamp1;

    service.createVersionBootcamp(dummyVersionBootcamp).subscribe(versionBootcamp => {
      expect(versionBootcamp).toEqual(dummyVersionBootcamp);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/versionBootcamp/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyVersionBootcamp);
  });
});