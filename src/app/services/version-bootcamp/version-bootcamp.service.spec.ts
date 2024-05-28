import { TestBed } from '@angular/core/testing';
import { VersionBootcampService } from './version-bootcamp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('VersionBootcampService', () => {
  let service: VersionBootcampService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VersionBootcampService]
    });
    service = TestBed.inject(VersionBootcampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});