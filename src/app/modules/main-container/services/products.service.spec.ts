import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { ResponseFreeDestinationAll } from '@app/core/interfaces/free-destination.interface';
import { RespondServiceProducts } from '@core/interfaces/products.interface';
import { ProductsService } from '@modules/main-container/services/products.service';
import { FreeDestinationAllMock } from '../../../../../test-helpers/mocks/data/freeDestinations.mock';
import { ProductsMock } from '../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';

describe('ProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ProductsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< Products >', () => {
    const service: ProductsService = TestBed.get(ProductsService);

    const mockProducts: RespondServiceProducts = {
      products: ProductsMock,
      success: true,
      errorMessage: '',
    };

    service.allProducts().subscribe((products: RespondServiceProducts) => {
      expect(products.products.CREDIT_CARD.length).toBe(3);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.products,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockProducts);
  });

  it('allFreeDestination should be returned Observable< ResponseFreeDestinationAll >', () => {
    const service: ProductsService = TestBed.get(ProductsService);

    service
      .allFreeDestination()
      .subscribe((products: ResponseFreeDestinationAll) => {
        expect(products).toEqual(FreeDestinationAllMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.freeDestination,
    );
    expect(req.request.method).toBe('POST');
    req.flush(FreeDestinationAllMock);
  });
});
