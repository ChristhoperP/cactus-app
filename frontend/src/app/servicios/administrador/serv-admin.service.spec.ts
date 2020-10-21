import { TestBed } from '@angular/core/testing';

import { ServAdminService } from './serv-admin.service';

describe('ServAdminService', () => {
  let service: ServAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
