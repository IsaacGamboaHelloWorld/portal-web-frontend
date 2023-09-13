import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import { IProductAffiliation } from '@core/interfaces/product-destination.interface';
import { environment } from '@environment';
import { AffiliationProductsMock } from '../../../../../../test-helpers/mocks/data/affiliation-products.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { AffiliationProductsService } from './affiliation-products.service';

describe('AffiliationProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [AffiliationProductsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AffiliationProductsService = TestBed.get(
      AffiliationProductsService,
    );
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< ProductDestinationRespInterface >', () => {
    const service: AffiliationProductsService = TestBed.get(
      AffiliationProductsService,
    );

    service
      .affiliationProducts('1', '2')
      .subscribe((data: IProductAffiliation) => {
        expect(data.productAffiliations.length).toBe(3);
        expect(data).toEqual(AffiliationProductsMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.affiliation_products,
    );
    expect(req.request.method).toBe('POST');
    req.flush(AffiliationProductsMock);
  });
});
