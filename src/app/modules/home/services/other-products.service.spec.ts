import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IRespOtherProducts } from '@core/interfaces/products.interface';
import { environment } from '@environment';
import { otherProductsMock } from '../../../../../test-helpers/mocks/data/other-products.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { OtherProductsService } from './other-products.service';

describe('OtherProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [OtherProductsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: OtherProductsService = TestBed.get(OtherProductsService);
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< IRespOtherProducts >', () => {
    const service: OtherProductsService = TestBed.get(OtherProductsService);

    service.OtherProducts('test').subscribe((data: IRespOtherProducts) => {
      expect(data).toBeDefined();
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.otherProducts,
    );
    expect(req.request.method).toBe('POST');
    req.flush(otherProductsMock);
  });
});
