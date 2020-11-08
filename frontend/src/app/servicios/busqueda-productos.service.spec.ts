import { TestBed } from '@angular/core/testing';

import { BusquedaProductosService } from './busqueda-productos.service';

describe('BusquedaProductosService', () => {
  let service: BusquedaProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
