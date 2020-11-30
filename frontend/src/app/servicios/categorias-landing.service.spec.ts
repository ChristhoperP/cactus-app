import { TestBed } from '@angular/core/testing';

import { CetegoriasLandingService } from './categorias-landing.service';

describe('CetegoriasLandingService', () => {
  let service: CetegoriasLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CetegoriasLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
