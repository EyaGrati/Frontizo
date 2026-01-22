import { TestBed } from '@angular/core/testing';

import { FuneralLocationService } from './funeral-location.service';

describe('FuneralLocationService', () => {
  let service: FuneralLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuneralLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
