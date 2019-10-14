import { TestBed } from '@angular/core/testing';

import { UiChartsService } from './ui-charts.service';

describe('UiChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiChartsService = TestBed.get(UiChartsService);
    expect(service).toBeTruthy();
  });
});
