import { TestBed } from '@angular/core/testing';

import { CeremonyService } from './ceremony.service';

describe('CeremonyService', () => {
  let service: CeremonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeremonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
