import { TestBed } from '@angular/core/testing';

import { StatusMessagesService } from './status-messages.service';

describe('StatusMessagesService', () => {
  let service: StatusMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
