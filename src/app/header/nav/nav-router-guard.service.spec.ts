import { TestBed, inject } from '@angular/core/testing';

import { NavRouterGuardService } from './nav-router-guard.service';
import { NavService } from './nav.service';
import { Http, ConnectionBackend } from '@angular/http';

describe('NavRouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavRouterGuardService, NavService, Http, ConnectionBackend]
    });
  });

  it('should be created', inject([NavRouterGuardService], (service: NavRouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
