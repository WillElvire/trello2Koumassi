import { TestBed } from '@angular/core/testing';

import { BackgroundModeService } from './background-mode.service';

describe('BackgroundModeService', () => {
  let service: BackgroundModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
