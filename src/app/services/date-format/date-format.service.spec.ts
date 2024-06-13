import { TestBed } from '@angular/core/testing';
import { DateFormatService } from './date-format.service';

describe('DateFormatService', () => {
  let service: DateFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFormatService]
    });
    service = TestBed.inject(DateFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format date to first semester correctly', () => {
    const dateString = '2023-04-15';
    const formattedDate = service.formatDateToSemester(dateString);
    expect(formattedDate).toEqual('2023-1');
  });

  it('should format date to second semester correctly', () => {
    const dateString = '2023-09-20';
    const formattedDate = service.formatDateToSemester(dateString);
    expect(formattedDate).toEqual('2023-2');
  });
});