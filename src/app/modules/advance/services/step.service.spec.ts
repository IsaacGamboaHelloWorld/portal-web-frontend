import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';

describe('StepService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [StepService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: StepService = TestBed.get(StepService);
    expect(service).toBeTruthy();
  });
});
