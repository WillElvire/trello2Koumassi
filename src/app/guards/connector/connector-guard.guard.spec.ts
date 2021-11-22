import { TestBed } from '@angular/core/testing';

import { ConnectorGuardGuard } from './connector-guard.guard';

describe('ConnectorGuardGuard', () => {
  let guard: ConnectorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConnectorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
