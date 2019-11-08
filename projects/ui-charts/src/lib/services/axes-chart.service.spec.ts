import { TestBed } from '@angular/core/testing';

import { AxesChartService } from './axes-chart.service';

describe('AxesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AxesChartService = TestBed.get(AxesChartService);
    expect(service).toBeTruthy();
  });
});
