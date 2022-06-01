import { TestBed } from '@angular/core/testing';

import { GuardRoleService } from './guard-role.service';

describe('GuardRoleService', () => {
  let service: GuardRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
