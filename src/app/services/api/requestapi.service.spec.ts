import { TestBed } from '@angular/core/testing';

import { RequestapiService } from './requestapi.service';

describe('RequestapiService', () => {
  let service: RequestapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
