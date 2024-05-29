import { TestBed } from '@angular/core/testing';

import { CapacityService } from './capacity.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { mockCapacity1, mockCapacity2, mockCapacity3,} from 'src/app/testing/mock-data';
import { environment } from 'src/environments/environment';

describe('CapacityService', () => {
  let service: CapacityService;
  let httpMock: HttpTestingController;
  let dummyCapacities: Capacity[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapacityService]
    });
    service = TestBed.inject(CapacityService);
    httpMock = TestBed.inject(HttpTestingController);

    service['capacities'] = [mockCapacity1, mockCapacity2, mockCapacity3];

    dummyCapacities = [mockCapacity1, mockCapacity2, mockCapacity3];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
});
