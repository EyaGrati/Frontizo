import { TestBed } from '@angular/core/testing';

import { FarrangementService } from './farrangement.service';

describe('FarrangementService', () => {
  let service: FarrangementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarrangementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
