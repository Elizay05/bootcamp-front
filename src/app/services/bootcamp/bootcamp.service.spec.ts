import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BootcampService } from './bootcamp.service';

describe('BootcampService', () => {
  let service: BootcampService;
  let fixture: ComponentFixture<BootcampService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BootcampService]
    }).compileComponents();
    service = TestBed.inject(BootcampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});