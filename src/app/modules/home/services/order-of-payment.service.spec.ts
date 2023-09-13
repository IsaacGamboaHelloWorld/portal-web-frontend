import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '@environment';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { OrderOfPaymentService } from './order-of-payment.service';

describe('OrderOfPaymentService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: OrderOfPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [OrderOfPaymentService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(OrderOfPaymentService);
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

  it('orderOfPayment', () => {
    const mock = {};
    service.orderOfPayment().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.order_of_payment,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
