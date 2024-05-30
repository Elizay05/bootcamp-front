import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockBootcamp1, mockCapacity1, mockCapacity2, mockCapacity3} from 'src/app/testing/mock-data';
import { environment } from 'src/environments/environment';
import { BootcampService } from './bootcamp.service';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { Capacity } from 'src/app/interfaces/capacity.interface';

describe('BootcampService', () => {
  let service: BootcampService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BootcampService]
    });
    service = TestBed.inject(BootcampService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a capacity', () => {
    const dummyBootcamp: Bootcamp = mockBootcamp1;

    service.createBootcamp(dummyBootcamp).subscribe(bootcamp => {
      expect(bootcamp).toEqual(dummyBootcamp);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/bootcamp/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyBootcamp);
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