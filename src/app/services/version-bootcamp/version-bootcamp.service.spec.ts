import { TestBed } from '@angular/core/testing';

import { VersionBootcampService } from './version-bootcamp.service';

describe('VersionBootcampService', () => {
  let service: VersionBootcampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionBootcampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
