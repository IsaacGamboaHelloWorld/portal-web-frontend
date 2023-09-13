import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { PaymentFOService } from './payment.service';

describe('PaymentFOService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PaymentFOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentFOService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PaymentFOService);
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

  it('publicBillPayment', () => {
    const resp = {};
    service.publicBillPayment({} as any).subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBillPayment,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });
});
