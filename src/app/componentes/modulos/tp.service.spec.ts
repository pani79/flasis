import { TestBed } from '@angular/core/testing';

import { TpService } from './tp.service';

describe('TpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TpService = TestBed.get(TpService);
    expect(service).toBeTruthy();
  });
});
