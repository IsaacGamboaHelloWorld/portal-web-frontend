import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { PayStackModelMock } from '../../../../../../test-helpers/mocks/models/payStack.model.mocks';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import {
  IDatePayStack,
  IPayStackFormOne,
  PilaPaymentRequest,
  PilaPaymentResponse,
} from '../../entities/pay-stack';
import { NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { StepFourComponent } from './step-four.component';

describe('StepFourComponent PayStack', () => {
  let component: StepFourComponent;
  let fixture: ComponentFixture<StepFourComponent>;
  let model: PayStackModel;
  let modelMock: PayStackModelMock;

  beforeEach(async(() => {
    modelMock = new PayStackModelMock();
    TestBed.configureTestingModule({
      declarations: [StepFourComponent, RemoveValuePipe],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        ManipulateDomService,
        {
          provide: PayStackModel,
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
    model = TestBed.get(PayStackModel);
    component = fixture.componentInstance;
    (component as any).codesProductBlocked = ['07', '20', '62'];
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call navigate should be return value', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigatePayStack);
  });

  it('infoPaystack$ should be called', () => {
    const result$ = component.infoPaystack;
    expect(model.stepOne$).toEqual(result$);
  });

  it('datePayStack$ should be called', () => {
    const result$ = component.datePayStack;
    expect(model.date$).toEqual(result$);
  });

  it('statePayment should be called', () => {
    const result$ = component.statePayment;
    expect(model.statePayment$).toEqual(result$);
  });

  it('ngOnInit', () => {
    const spyStep = spyOn(component as any, '_setStep');
    component.viewSucces = false;
    component.imgTicket = '-';
    component.textBtn = '-';
    component.textTitle = '-';

    const data: IDatePayStack = {
      date: new Date('2021-01-10'),
    };

    modelMock.setInnerDateData = data;

    component.ngOnInit();

    expect(spyStep).toHaveBeenCalled();
    expect(component.viewSucces).toBeFalsy();
    expect(component.imgTicket).toEqual('/confirmation.png');
    expect(component.textBtn).toEqual('PAY_STACK.CONFIRM.BTN');
    expect(component.textTitle).toEqual('PAYMENT_TAXES.CONFIRM.TEXTCONFIRM');
  });

  it('_setStep should call model.setStep', () => {
    const step = 2;
    const spyStep = spyOn(model, 'setStep');

    (component as any)._setStep(step);

    expect(spyStep).toHaveBeenCalledWith({ step });
  });

  it('call doEdit', () => {
    const spyStep = spyOn(component as any, '_setStep');
    const spyClean = spyOn(model, 'cleanOnBackAction');
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    component.doEdit();

    expect(spyClean).toHaveBeenCalled();
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

  it('formatDate with true conditions', () => {
    const newDate = new Date('2021-01-02');
    const formated = component.formatDate(newDate);
    expect(formated).toEqual('2021-01-01T00:00:00.000');
  });

  it('formatDate with false conditions', () => {
    const newDate = new Date('2021-12-12');
    const formated = component.formatDate(newDate);
    expect(formated).toEqual('2021-12-11T00:00:00.000');
  });

  it('submitData check with statePayment conditionals is true', () => {
    //#region "arrange for infoPaymentTaxes"
    const paymentTaxesFormOne: IPayStackFormOne = {
      account_origin: ProductsMock.DEPOSIT_ACCOUNT[0],
      payroll: {},
      number_payroll: 1,
      month: '10',
      period: '02',
      amount: 2500,
      invoiceNumber: '101010',
    };

    modelMock.setInnerOneData = paymentTaxesFormOne;

    const sendData: PilaPaymentRequest = {
      originAccount: {
        accountId: paymentTaxesFormOne.account_origin.id,
        accountType: paymentTaxesFormOne.account_origin.typeAccount,
        nickName: '',
      },
      payment: {
        amount: paymentTaxesFormOne.amount,
        billerId: paymentTaxesFormOne.payroll['organizationId'],
        billerName: paymentTaxesFormOne.payroll['entityName'],
        nie: String(paymentTaxesFormOne.number_payroll),
        invoice: paymentTaxesFormOne.invoiceNumber.split(' ').join(''),
      },
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

    const answerPaymentTaxes: PilaPaymentResponse = {
      approvalId: '1',
      additionalErrorCode: '404',
      additionalErrorMessage: 'not found',
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
    const paymentTaxesFormOne: IPayStackFormOne = {
      account_origin: ProductsMock.DEPOSIT_ACCOUNT[0],
      payroll: {},
      number_payroll: 1,
      month: '10',
      period: '02',
      amount: 2500,
      invoiceNumber: '101010',
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

    const answerPaymentTaxes: PilaPaymentResponse = {
      approvalId: '1',
      additionalErrorCode: '404',
      additionalErrorMessage: 'not found',
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
