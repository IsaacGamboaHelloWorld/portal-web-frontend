import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ToPlusService } from './to-plus.service';

describe('ToPlusService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ToPlusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ToPlusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(ToPlusService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    injector = null;
    httpMock = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadToPlus', () => {
    const mock = {
      success: true,
      status: '',
      totalPoints: 100,
      points: {
        BANCO_DE_BOGOTA: 25,
        BANCO_POPULAR: 25,
        BANCO_OCCIDENTE: 25,
        BANCO_AV_VILLAS: 25,
      },
    };
    service.loadToPlus().subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.toPlus,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
