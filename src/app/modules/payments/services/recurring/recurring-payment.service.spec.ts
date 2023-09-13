import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '@app/core/interfaces/paymentBills.interface';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RecurringPaymentService } from './recurring-payment.service';

describe('RecurringPaymentService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: RecurringPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [RecurringPaymentService, TypeCreditCardPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(RecurringPaymentService);
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

  it('saveRecurring', () => {
    const request: IRecurringPayment = {
      billerId: '00000043',
      billerNickname: 'Acueducto prueba',
      contract: '31056278',
      reference: null,
      paymentType: 'NON_RECURRING_PAYMENT',
      maxAmount: 0,
      daysBeforeAfterExpiration: 0,
      originAccountId: null,
      originAccountType: null,
    };

    const resp: IRecurringPaymentResponse = {
      approvalId: 0,
      success: true,
      errorMessage: '',
    };
    service.saveRecurring(request).subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.recurring.create,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });
});
