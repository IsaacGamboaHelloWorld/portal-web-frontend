import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { TestingModule } from '@root/test-helpers/testing.module';

import { OnlyLowEnvironmentGuard } from './only-low-environment.guard';

describe('OnlyLowEnvironmentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  it('should ...', inject(
    [OnlyLowEnvironmentGuard],
    (guard: OnlyLowEnvironmentGuard) => {
      expect(guard).toBeTruthy();
    },
  ));
});
