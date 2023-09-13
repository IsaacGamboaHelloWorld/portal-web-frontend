import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UtilsService } from '@app/modules/paymentsv2/financial-ob/transversal/utils.service';
import { Navigate } from '@core/constants/navigate';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { HistoricComponent } from './../../../../../payments/home-payments/components/historic/historic.component';
import { IFinancialOp } from './../../../entities/financial-op';

import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentModel } from '@app/modules/payments/payment.model';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { PaymentModelMock } from '../../../../../../../../test-helpers/mocks/models/payment.model.mock';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { RegisteredObligationComponent } from './registered-obligation.component';

describe('RegisteredObligationComponent', () => {
  let component: RegisteredObligationComponent;
  let fixture: ComponentFixture<RegisteredObligationComponent>;
  let facadeMock: PaymentsV2ModelMock;
  let historyMock: any;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        RegisteredObligationComponent,
        HistoricComponent,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
      ],
      providers: [
        UtilsService,
        ManipulateDomService,
        {
          provide: FinancialOpFacade,
          useValue: facadeMock,
        },
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    historyMock = {
      data: [
        {
          paymentType: 'NON_BILLER',
          paymentDate: '2019-12-19',
          approvalId: null,
          paymentStatus: 'ERROR',
          paymentStatusMessage: 'timeout',
          destinationEntityName: 'BILLER_NAME',
          nickName: 'BILLER_NICK_NAME',
          originAccount: '81726487264',
          originAccountType: 'DEPOSIT_ACCOUNT',
          amount: 12345,
          loanPaymentData: null,
          creditCardPaymentData: null,
          billerPaymentData: null,
          nonBillerPaymentData: null,
          taxPaymentData: null,
          psePaymentData: null,
        },
      ],
      errorMessage: '',
      loading: false,
      loaded: true,
      error: false,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call T_CC should be return TYPE_ACCOUNTS.CREDIT_CARD', () => {
    const data: IFinancialOp = {
      accountId: '10101010',
      accountType: 'TC',
      bank: '002',
      loanName: 'Tarjeta de Credito',
      bankName: 'Banco Popular',
      newLoan: true,
    };
    component.paymentSelected = data;

    const result = component.T_CC;
    expect(result).toBeTruthy();
  });

  it('paymentSubmit with data', () => {
    const data: IFinancialOp = {
      accountId: '10101010',
      accountType: 'TC',
      bank: '002',
      loanName: 'Tarjeta de Credito',
      bankName: 'Banco Popular',
      newLoan: true,
    };
    component.paymentSelected = data;

    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    const facade = TestBed.get(FinancialOpFacade);
    const spySelect = spyOn(facade, 'selectPayment');

    component.paymentSubmit();

    expect(spySelect).toHaveBeenCalledWith(data);
    expect(spyRouter).toHaveBeenCalledWith([Navigate.paymentsv2payloan]);
  });

  it('paymentSubmit without data', () => {
    component.paymentSelected = null;

    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    const facade = TestBed.get(FinancialOpFacade);
    const spySelect = spyOn(facade, 'selectPayment');

    component.paymentSubmit();

    expect(spySelect).not.toHaveBeenCalled();
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('changeStatusClick', () => {
    component.changeStatusClick({});
  });

  it('doDeleteFinancialOp', () => {
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'doDeleteFinancialOp');
    const $event = {};
    const data = {
      data: $event,
    };
    component.doDeleteFinancialOp($event);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('_filterForPayment for loanPaymentData', () => {
    const loanPaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          loanPaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for creditCardPaymentData', () => {
    const creditCardPaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          creditCardPaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for billerPaymentData', () => {
    const billerPaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          billerPaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for nonBillerPaymentData', () => {
    const nonBillerPaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          nonBillerPaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for taxPaymentData', () => {
    const taxPaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          taxPaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for psePaymentData', () => {
    const psePaymentData = {
      accountId: '1',
      accountType: null,
      nie: '123436132',
      serviceCode: '123134123',
      invoice: null,
    };

    const data = {
      data: [
        {
          ...historyMock.data[0],
          psePaymentData,
        },
      ],
    };

    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(data.data));
  });

  it('_filterForPayment for none', () => {
    component.paymentSelected = {
      accountId: '1',
    } as any;
    const result = (component as any)._filterForPayment(historyMock);
    expect(JSON.stringify(result)).toEqual(JSON.stringify([]));
  });

  it('_filterForPayment else', () => {
    const result = (component as any)._filterForPayment({});
    expect(result).toEqual(undefined);
  });

  it('historicPayments', () => {
    facadeMock.setInnerHistoryPayment = historyMock;
    component.historicPayments$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(
        JSON.stringify({
          data: [],
          errorMessage: '',
          loading: false,
          loaded: true,
          error: false,
        }),
      );
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
