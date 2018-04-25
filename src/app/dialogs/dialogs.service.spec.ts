import { TestBed, inject } from '@angular/core/testing';

import { DialogsService } from './dialogs.service';
import { MatDialog } from '@angular/material';
import { OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

describe('DialogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogsService, MatDialog, OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher, Platform]
    });
  });

  it('should be created', inject([DialogsService], (service: DialogsService) => {
    expect(service).toBeTruthy();
  }));
});
