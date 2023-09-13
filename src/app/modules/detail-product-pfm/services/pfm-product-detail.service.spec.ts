import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { PfmMovimentRequest } from '../entities';

import { PfmProductDetailService } from './pfm-product-detail.service';

describe('PfmProductDetailService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PfmProductDetailService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [PfmProductDetailService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PfmProductDetailService);
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

  it('getPfmProducts', () => {
    const mock = {};
    service.getPfmProducts('10', '2021').subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pfm.products,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('getPfmMovements', () => {
    const mock = {};
    const body: PfmMovimentRequest = {
      month: '10',
      year: '2021',
      idProduct: '01',
      idCategory: '01',
    };
    service.getPfmMovements(body).subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pfm.moviments,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
