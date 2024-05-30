import { TestBed } from '@angular/core/testing';
import { VersionBootcampService } from './version-bootcamp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VersionBootcamp } from 'src/app/interfaces/version-bootcamp.interface';
import { environment } from 'src/environments/environment';
import { mockVersionBootcamp1 } from 'src/app/testing/mock-data';


describe('VersionBootcampService', () => {
  let service: VersionBootcampService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VersionBootcampService]
    });
    service = TestBed.inject(VersionBootcampService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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