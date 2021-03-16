import { TestBed } from '@angular/core/testing';

import { TpAsignacionService } from './tp-asignacion.service';

describe('TpAsignacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TpAsignacionService = TestBed.get(TpAsignacionService);
    expect(service).toBeTruthy();
  });
});
