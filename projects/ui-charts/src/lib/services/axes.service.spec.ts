import { TestBed } from '@angular/core/testing';

import { AxesService } from './axes.service';

describe('AxesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AxesService = TestBed.get(AxesService);
    expect(service).toBeTruthy();
  });
});
