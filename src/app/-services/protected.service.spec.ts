import { TestBed, inject } from '@angular/core/testing';

import { ProtectedService } from './protected.service';
import { HttpModule } from "@angular/http/http";

describe('ProtectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtectedService]
    });
  });

});
