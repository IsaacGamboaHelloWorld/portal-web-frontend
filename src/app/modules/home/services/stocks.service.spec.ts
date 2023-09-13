import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { TestingModule } from '../../../../../test-helpers/testing.module';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: StocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [StocksService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(StocksService);
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

  it('allStocks', () => {
    const mock = {};
    service.allStocks({} as any).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.stocks.all,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('typeStocks', () => {
    const mock = {};
    service.typeStocks().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.stocks.types,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('periodStocks', () => {
    const mock = {};
    service.periodStocks().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.stocks.period,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
