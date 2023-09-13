import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { AuthSession } from '@app/core/services/auth-session';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { environment } from '@environment';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
  ReCaptchaV3Service,
} from 'ng-recaptcha';
import {
  banksPseSuccessMock,
  initPseSuccessMock,
  statusPseSuccessMock,
} from '../../../../../../../test-helpers/mocks/data/private-pse.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { BanksPseResponse } from '../entities/banks-pse.interface';
import {
  IPaymentPseRequest,
  IPaymentPseResponse,
} from '../entities/payment-transaction-pse.interface';
import { IPaymentPseStatusResponse } from '../entities/status-pse.interface';

import { PsePrivateService } from './pse-private.service';

describe('PsePrivateService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PsePrivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      providers: [
        PsePrivateService,
        SecurityService,
        Security,
        ReCaptchaV3Service,
        AuthSession,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PsePrivateService);
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

  it('banksPse', () => {
    service.banksPse().subscribe((response: BanksPseResponse) => {
      expect(response).toBe(banksPseSuccessMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.psePrivate.banks,
    );
    expect(req.request.method).toBe('POST');
    req.flush(banksPseSuccessMock);
  });

  it('initPse', () => {
    const request: IPaymentPseRequest = {
      paymentData: {
        commerceCode: 'O304',
        productType: '' as any,
        productId: '',
        amount: 1000,
        bank: {
          bankId: '',
          bankName: '',
        },
        paymentType: '3' as any,
        firstName: '',
        lastName: '',
        description: '',
        emailAddress: '',
        legalUserType: '1' as any,
        invoice: '',
        redirectSuccessUrl: '',
      },
    };
    service.initPse(request).subscribe((response: IPaymentPseResponse) => {
      expect(response).toBe(initPseSuccessMock.data);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.psePrivate.init,
    );
    expect(req.request.method).toBe('POST');
    req.flush(initPseSuccessMock.data);
  });

  it('getStatusPse', () => {
    const paymentId = '123';
    service
      .getStatusPse(paymentId)
      .subscribe((response: IPaymentPseStatusResponse) => {
        expect(response).toBe(statusPseSuccessMock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.psePrivate.status,
    );
    expect(req.request.method).toBe('POST');
    req.flush(statusPseSuccessMock);
  });
});
