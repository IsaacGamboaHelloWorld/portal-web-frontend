import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { PaymentMock } from './../../../../../../test-helpers/mocks/data/payment.mock';

import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentBillService } from './bill-payment.service';

describe('BillPaymentService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PaymentBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [PaymentBillService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PaymentBillService);
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

  it('publicBillPayment to be call with GET method', () => {
    service
      .publicBillPayment(
        '',
        '',
        '',
        true,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        true,
        true,
        '',
        '',
        '',
        '',
        '',
      )
      .subscribe((result: any) => {
        expect(result).toBe(PaymentMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBillPayment,
    );

    expect(req.request.method).toBe('POST');
    req.flush(PaymentMock);
  });
});
