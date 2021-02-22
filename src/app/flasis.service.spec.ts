import { TestBed } from '@angular/core/testing';

import { FlasisService } from './flasis.service';

describe('FlasisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlasisService = TestBed.get(FlasisService);
    expect(service).toBeTruthy();
  });
});
