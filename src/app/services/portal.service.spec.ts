import { TestBed, inject } from '@angular/core/testing';

import { PortalService } from './portal.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

describe('PortalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalService, Http]
    });
  });

  // it('should be created', inject([PortalService], (service: PortalService) => {
  //   expect(service).toBeTruthy();
  // }));
});
