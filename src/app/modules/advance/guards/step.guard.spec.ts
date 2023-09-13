import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { StepService } from '@modules/advance/services/step.service';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { StepGuard } from './step.guard';

describe('StepGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [StepGuard, StepService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  it('should be called with step equal to 1...', inject(
    [StepGuard, StepService],
    (guard: StepGuard, step: StepService) => {
      step.setStep(1);
      guard.canActivate().subscribe();
      expect(guard).toBeTruthy();
    },
  ));

  it('should be called with step equal to 2 ...', inject(
    [StepGuard, StepService],
    (guard: StepGuard, step: StepService) => {
      step.setStep(2);
      guard.canActivate().subscribe();
      expect(guard).toBeTruthy();
    },
  ));
});
