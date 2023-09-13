import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import { Movement } from '@core/models/movement/movement';
import { environment } from '@environment';
import { MovementMock } from '../../../../../../test-helpers/mocks/data/movements.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { MovementsService } from './movements.service';

describe('MovementsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [MovementsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: MovementsService = TestBed.get(MovementsService);
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< Movement >', () => {
    const service: MovementsService = TestBed.get(MovementsService);

    service.movements('sda', '123').subscribe((movement: Movement) => {
      expect(movement.operations.length).toBe(3);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.movements,
    );
    expect(req.request.method).toBe('POST');
    req.flush(MovementMock);
  });
});
