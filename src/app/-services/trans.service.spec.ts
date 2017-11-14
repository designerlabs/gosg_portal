import { TestBed, inject } from '@angular/core/testing';

import { TransService } from './trans.service';

describe('TranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransService]
    });
  });

  // it('should be created', inject([TransService], (service: TransService) => {
  //   expect(service).toBeTruthy();
  // }));
});
