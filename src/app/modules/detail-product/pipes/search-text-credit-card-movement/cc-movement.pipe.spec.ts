import { CcMovementPipe } from './cc-movement.pipe';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MovementMock } from '../../../../../../test-helpers/mocks/data/movements.mock';

describe('CcMovementPipe', () => {
  let pipe: CcMovementPipe;

  TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    pipe = new CcMovementPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned replace value', () => {
    const result = pipe.transform(MovementMock.creditCardMovements, 'ATH');
    expect(result.length).toEqual(3);
  });

  it('should be returned value default', () => {
    expect(pipe.transform(null, '')).toBeNull();
  });
});
