import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { PreviousRouteService } from './previous-route.service';

describe('PreviousRouteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [PreviousRouteService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: PreviousRouteService = TestBed.get(PreviousRouteService);
    expect(service).toBeTruthy();
  });
});
