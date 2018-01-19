import { TestBed, inject } from '@angular/core/testing';

import { AnnouncementlistService } from './announcementlist.service';

describe('AnnouncementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnouncementlistService]
    });
  });

  it('should be created', inject([AnnouncementlistService], (service: AnnouncementlistService) => {
    expect(service).toBeTruthy();
  }));
});
