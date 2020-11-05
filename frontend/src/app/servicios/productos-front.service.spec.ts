import { TestBed } from '@angular/core/testing';

import { ProductosFrontService } from './productos-front.service';

describe('ProductosFrontService', () => {
  let service: ProductosFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
