import { TestBed } from '@angular/core/testing';

import { CapacityService } from './capacity.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CapacityService', () => {
  let service: CapacityService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapacityService]
    }).compileComponents();
    service = TestBed.inject(CapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
