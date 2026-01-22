import { TestBed } from '@angular/core/testing';

import { FlowerStatisticsService } from './flower-statistics.service';

describe('FlowerStatisticsService', () => {
  let service: FlowerStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
