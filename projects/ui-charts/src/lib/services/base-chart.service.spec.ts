import { TestBed } from '@angular/core/testing';

import { BaseChartService } from './base-chart.service';

describe('BaseChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseChartService = TestBed.get(BaseChartService);
    expect(service).toBeTruthy();
  });
});
