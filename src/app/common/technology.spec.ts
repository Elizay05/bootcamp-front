import { TestBed } from '@angular/core/testing';

import { Technology } from './technology';

describe('Technology', () => {
  let service: Technology;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Technology);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
