import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TechnologyService } from './technology.service';
import { Technology } from 'src/app/interfaces/technology.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { mockTechnology1, mockTechnology2, mockTechnology3 } from 'src/app/testing/mock-data';
import { of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let httpMock: HttpTestingController;
  let dummyTechnologies: Technology[] = [];
  let dummyResult: PaginatedResult<Technology>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TechnologyService]
    });
    service = TestBed.inject(TechnologyService);
    httpMock = TestBed.inject(HttpTestingController);

    dummyTechnologies = [mockTechnology1, mockTechnology2, mockTechnology3];

    dummyResult = {
      content: dummyTechnologies,
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
    };

    let currentState: any = null;

    service.getPaginationState().pipe(take(1)).subscribe(state => {
      currentState = state;
    });

    const actualState = service['paginationState'].getValue();

    expect(currentState).toEqual(expectedState);
    expect(actualState).toEqual(expectedState);
  });

  it('should load technologies', () => {
    spyOn(service, 'loadTechnologies').and.returnValue(of({
      content: [],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0
    }));

    (service.loadTechnologies as jasmine.Spy).and.returnValue(of(dummyResult));
    service.loadTechnologies().subscribe(result => {
      expect(result).toEqual(dummyResult);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/technology/?page=0&size=10&isAscending=true`);
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

  it('should refresh data', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/technology/?page=0&size=10&isAscending=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTechnologies);

    service.refreshData();

    httpMock.expectOne(`${environment.apiBaseUrl}/technology/?page=0&size=10&isAscending=true`);
  });

  it('should create a technology', () => {
    const dummyTechnology: Technology = mockTechnology1;

    service.createTechnology(dummyTechnology).subscribe(technology => {
      expect(technology).toEqual(dummyTechnology);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/technology/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyTechnology);
  });
});
