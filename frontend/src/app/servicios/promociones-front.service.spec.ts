import { TestBed } from '@angular/core/testing';

import { PromocionesFrontService } from './promociones-front.service';

describe('PromocionesFrontService', () => {
  let service: PromocionesFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocionesFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
