import { TestBed, inject } from '@angular/core/testing';

import { NavRouterGuardService } from './nav-router-guard.service';

describe('NavRouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavRouterGuardService]
    });
  });

  it('should be created', inject([NavRouterGuardService], (service: NavRouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
