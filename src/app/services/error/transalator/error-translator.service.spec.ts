import { TestBed } from '@angular/core/testing';

import { ErrorTranslatorService } from './error-translator.service';

describe('ErrorTranslatorService', () => {
  let service: ErrorTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
