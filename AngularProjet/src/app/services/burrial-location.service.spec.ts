import { TestBed } from '@angular/core/testing';

import { BurrialLocationService } from './burrial-location.service';

describe('BurrialLocationService', () => {
  let service: BurrialLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurrialLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
