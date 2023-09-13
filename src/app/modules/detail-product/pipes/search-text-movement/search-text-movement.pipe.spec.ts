import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SearchTextMovementPipe } from '@modules/detail-product/pipes/search-text-movement/search-text-movement.pipe';
import { MovementMock } from '../../../../../../test-helpers/mocks/data/movements.mock';

describe('SearchTextMovementPipe', () => {
  let pipe: SearchTextMovementPipe;

  TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  });

  beforeEach(() => {
    pipe = new SearchTextMovementPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned replace value', () => {
    const result = pipe.transform(MovementMock.operations, 'trans');
    expect(result.length).toEqual(3);
  });

  it('should be returned value default', () => {
    expect(pipe.transform(null, '')).toBeNull();
  });
});
