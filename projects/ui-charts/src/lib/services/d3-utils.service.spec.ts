import { TestBed } from '@angular/core/testing';

import { D3UtilsService } from './d3-utils.service';

describe('D3UtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D3UtilsService = TestBed.get(D3UtilsService);
    expect(service).toBeTruthy();
  });
});
