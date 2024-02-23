import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { prefixGuard } from './prefix.guard';

describe('prefixGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => prefixGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
