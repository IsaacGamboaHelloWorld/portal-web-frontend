import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductsMock } from './../../../../../../test-helpers/mocks/data/products.mock';
import {
  IAnswerPaymentTaxes,
  IPaymentTaxesFormOne,
  ISendPaymentTaxes,
} from './../../entities/payment-taxes';
import { NavigatePaymentTaxes } from './../../entities/routes';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentTaxesModelMock } from '../../../../../../test-helpers/mocks/models/paymentTaxes.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';
import { StepFourComponent } from './step-four.component';

describe('StepFourComponent for Taxes', () => {
  let component: StepFourComponent;
  let fixture: ComponentFixture<StepFourComponent>;
  let model: PaymentTaxesModel;
  let modelMock: PaymentTaxesModelMock;

  beforeEach(async(() => {
    modelMock = new PaymentTaxesModelMock();
    TestBed.configureTestingModule({
      declarations: [StepFourComponent, RemoveValuePipe],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentTaxesModel,
          useValue: modelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        NicknamesService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFourComponent);
    model = TestBed.get(PaymentTaxesModel);
    component = fixture.componentInstance;
    (component as any).codesProductBlocked = ['07', '20', '62'];
    fixture.isStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call navigate should be return value', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigatePaymentTaxes);
  });

  it('stepOne$ should be called', () => {
    const result$ = component.infoPaymentTaxes;
    expect(model.stepOne$).toEqual(result$);
  });

  it('datePaymentTaxes$ should be called', () => {
    const result$ = component.datePaymentTaxes;
    expect(model.date$).toEqual(result$);
  });

  it('statePayment$ should be called', () => {
    const result$ = component.statePayment;
    expect(model.statePayment$).toEqual(result$);
  });

  it('_setStep should call model.setStep', () => {
    const step = 2;
    const spyStep = spyOn(model, 'setStep');

    (component as any)._setStep(step);

    expect(spyStep).toHaveBeenCalledWith({ step });
  });

  it('call doEdit', () => {
    const spyStep = spyOn(component as any, '_setStep');
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    component.doEdit();

    expect(spyStep).toHaveBeenCalledWith(1);
    expect(spyRouter).toHaveBeenCalledWith([component.navigate.step1]);
  });

  it('call end', () => {
    const spyStep = spyOn(component as any, '_setStep');
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');
    const spyReset = spyOn(model, 'reset');

    component.end();

    expect(spyStep).toHaveBeenCalledWith(1);
    expect(spyRouter).toHaveBeenCalledWith([component.navigate.payment]);
    expect(spyReset).toHaveBeenCalled();
  });

  it('call _resetDisabled', () => {
    component.disabled = true;
    (component as any)._resetDisabled();
    expect(component.disabled).toBeFalsy();
  });

  it('call doNew', () => {
    const spyStep = spyOn(component as any, '_setStep');
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    component.doNew();

    expect(spyStep).toHaveBeenCalledWith(1);
    expect(spyRouter).toHaveBeenCalledWith([component.navigate.payment]);
  });

  it('call download', () => {
    component.disabled = false;

    component.download();

    expect(component.disabled).toBeTruthy();
  });

  it('submitData check with statePayment conditionals is true', () => {
    //#region "arrange for infoPaymentTaxes"
    const paymentTaxesFormOne: IPaymentTaxesFormOne = {
      account_origin: ProductsMock.DEPOSIT_ACCOUNT[0],
      city: {},
      taxe: {},
      reference: 101010,
      amount: 2500,
    };

    modelMock.setInnerOneData = paymentTaxesFormOne;

    const sendData: ISendPaymentTaxes = {
      accountId: paymentTaxesFormOne.account_origin.id,
      accountType: paymentTaxesFormOne.account_origin.typeAccount,
      cityId: paymentTaxesFormOne.city['id'],
      serviceCode: paymentTaxesFormOne.taxe['organizationIdType'],
      nie: String(paymentTaxesFormOne.reference),
      invoiceNumber: String(paymentTaxesFormOne.reference),
      amount: String(paymentTaxesFormOne.amount),
      serviceCompanyName: `${paymentTaxesFormOne.city['name']} - ${paymentTaxesFormOne.taxe['entityName']}`,
      originNickName: component.nicknameFrom,
    };
    const spyCreationSuccess = spyOn(model, 'creationSucces');
    //#endregion "arrange for infoPaymentTaxes"

    //#region "arrange for statePayment"
    component.approvalId = false;
    component.imgTicket = '';
    component.textBtn = '';
    component.textTitle = '';
    component.textDescription = '';
    component.textButton = '';

    const answerPaymentTaxes: IAnswerPaymentTaxes = {
      approvalId: '1',
      success: true,
      errorMessage: 'error genérico',
      specificErrorMessage: '',
      dateTime: '2021-01-13T17:49:09.902',
      request: {} as any,
    };

    modelMock.setInnerStatePaymentData = answerPaymentTaxes;
    //#endregion "arrange for statePayment"

    component.submitData();

    //#region "assert for infoPaymentTaxes"
    expect(spyCreationSuccess).toHaveBeenCalledWith(sendData);
    //#endregion "assert for infoPaymentTaxes"

    //#region "assert for statePayment"
    expect(component.approvalId).toBeFalsy();
    expect(component.viewSucces).toBeTruthy();
    expect(component.imgTicket).toEqual('/like_success.svg');
    expect(component.textBtn).toEqual('TRANSFER.PENDING.BTN');
    expect(component.textTitle).toEqual('PAYMENT_TAXES.CONFIRM.TEXTSUCCESS');
    expect(component.textDescription).toEqual(
      'PAYMENT_TAXES.CONFIRM.DESCRIPTION',
    );
    expect(component.textButton).toEqual('ADVANCE.DOWNLOAD');
    //#endregion "assert for statePayment"
  });

  it('submitData check with statePayment conditionals is false', () => {
    //#region "arrange for infoPaymentTaxes"
    const paymentTaxesFormOne: IPaymentTaxesFormOne = {
      account_origin: ProductsMock.DEPOSIT_ACCOUNT[0],
      city: {},
      taxe: {},
      reference: 101010,
      amount: 2500,
    };

    modelMock.setInnerOneData = paymentTaxesFormOne;

    //#endregion "arrange for infoPaymentTaxes"

    //#region "arrange for statePayment"
    component.approvalId = true;
    component.viewSucces = false;
    component.imgTicket = '-';
    component.textBtn = '-';
    component.textTitle = '-';
    component.textDescription = '-';
    component.textButton = '-';

    const answerPaymentTaxes: IAnswerPaymentTaxes = {
      approvalId: '1',
      success: false,
      errorMessage: '',
      specificErrorMessage: '',
      dateTime: '2021-01-13T17:49:09.902',
      request: {} as any,
    };

    modelMock.setInnerStatePaymentData = answerPaymentTaxes;
    //#endregion "arrange for statePayment"

    component.submitData();

    //#region "assert for statePayment"
    expect(component.approvalId).toBeTruthy();
    expect(component.viewSucces).toBeFalsy();
    expect(component.imgTicket).toEqual('-');
    expect(component.textBtn).toEqual('-');
    expect(component.textTitle).toEqual('-');
    expect(component.textDescription).toEqual('-');
    expect(component.textButton).toEqual('-');
    //#endregion "assert for statePayment"
  });
});
