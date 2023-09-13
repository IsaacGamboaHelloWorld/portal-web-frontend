import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../../payments/payment.model';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { EnrollFOContainer } from './enroll.container';

describe('EnrollComponent', () => {
  let component: EnrollFOContainer;
  let fixture: ComponentFixture<EnrollFOContainer>;
  let parentMock: PaymentModelMock;

  beforeEach(async(() => {
    parentMock = new PaymentModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [EnrollFOContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
        {
          provide: FinancialOpFacade,
          useValue: parentMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollFOContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    const spyNext = spyOn((component as any)._destroy$, 'next');
    const spyComp = spyOn((component as any)._destroy$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComp).toHaveBeenCalled();
  });

  it('should be validate compareFnBanks return boolean', () => {
    const value1 = {
      value: 1,
    };
    const value2 = {
      value: 2,
    };
    expect(component.compareFnBanks(value1, value2)).toBeFalsy();
    expect(component.compareFnBanks(value1, value1)).toBeTruthy();
    expect(component.compareFnBanks(null, value2)).toBeFalsy();
  });

  it('should be validate compareFnLoanType return boolean', () => {
    const value1 = {
      loanType: 1,
    };
    const value2 = {
      loanType: 2,
    };
    expect(component.compareFnLoanType(value1, value2)).toBeFalsy();
    expect(component.compareFnLoanType(value1, value1)).toBeTruthy();
    expect(component.compareFnLoanType(null, value2)).toBeFalsy();
  });

  it('setClass', () => {
    const _id = '1';
    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass(_id);

    expect(spyRemove).toHaveBeenCalledWith(
      '.form-radiobutton-contanier',
      'active',
    );
    expect(spyAdd).toHaveBeenCalledWith('.type-owner-' + _id, 'active');
  });

  it('doSubmit', () => {
    component.formEnroll = new FormGroup({
      bank: new FormControl('1', Validators.required),
      loanType: new FormControl('2', Validators.required),
      number_prod: new FormControl('3', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      name_prod: new FormControl('', Validators.required),
    });

    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'fetchPayment');

    component.doSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it('changeBank', () => {
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'resetBankLoans');
    component.changeBank();
    expect(spy).toHaveBeenCalled();
  });

  it('fetchBankLoans', () => {
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'fetchBankLoans');
    component.fetchBankLoans();
    expect(spy).toHaveBeenCalled();
  });

  it('bank_loans$', () => {
    const model = TestBed.get(PaymentModel);
    const result = component.bank_loans$;
    expect(result).toEqual(model.bank_loans$);
  });

  it('loans_banks$', () => {
    const model = TestBed.get(PaymentModel);
    const result = component.loans_banks$;
    expect(result).toEqual(model.loans_banks$);
  });

  it('payment$', () => {
    const model = TestBed.get(PaymentModel);
    const result = component.payment$;
    expect(result).toEqual(model.payment$);
  });
});
