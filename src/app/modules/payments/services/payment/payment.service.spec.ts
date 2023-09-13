import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentMock } from './../../../../../../test-helpers/mocks/data/payment.mock';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [PaymentService, TypeCreditCardPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PaymentService);
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

  it('getCreditCardBrand is called with credit card type and number from mastercard', () => {
    const result = (service as any).getCreditCardBrand(
      '5555555555554444',
      'TC',
    );
    expect(result).toEqual('01');
  });

  it('getCreditCardBrand is called with credit card type and number from visa', () => {
    const result = (service as any).getCreditCardBrand(
      '4111111111111111',
      'TC',
    );
    expect(result).toEqual('02');
  });

  it('getCreditCardBrand is called with credit card type and number from American Express', () => {
    const result = (service as any).getCreditCardBrand('378282246310005', 'TC');
    expect(result).toEqual(null);
  });

  it('getCreditCardBrand is called with credit card type and number from American Express', () => {
    const result = (service as any).getCreditCardBrand(
      '1000001',
      'DEPOSIT_ACCOUNT',
    );
    expect(result).toEqual(null);
  });

  it('call accountPayment when destinationNewLoan is true', () => {
    service
      .accountPayment('', '', 0, '', '', '', '', 'true', '', '', '')
      .subscribe((result: any) => {
        expect(result).toBe(PaymentMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.payment,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PaymentMock);
  });

  it('call accountPayment when destinationNewLoan is false', () => {
    service
      .accountPayment('', '', 0, '', '', '', '', 'false', '', '', '')
      .subscribe((result: any) => {
        expect(result).toBe(PaymentMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.payment,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PaymentMock);
  });
});
