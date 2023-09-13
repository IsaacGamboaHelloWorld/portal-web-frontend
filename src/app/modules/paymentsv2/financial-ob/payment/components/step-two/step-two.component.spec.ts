import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ProductsMock } from '../../../../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepTwoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentObligationsFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: FinancialOpFacade,
          useValue: facadeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_initForm', () => {
    component.formTwo = new FormGroup({
      option_to_pay: new FormControl('', Validators.required),
      amounttext: new FormControl('', [Validators.min(1)]),
      comments: new FormControl(''),
    });
    (component as any)._initForm();
    expect(component.formTwo.get('option_to_pay').value).toEqual('');
    expect(component.formTwo.get('amounttext').value).toEqual('');
    expect(component.formTwo.get('comments').value).toEqual('');
  });

  it('products$', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const result = component.products$;
    expect(result).toEqual(facade.selectAllProducts$);
  });

  it('firstForm$', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const result = component.firstForm$;
    expect(result).toEqual(facade.getStepOne$);
  });

  it('configureFront', () => {
    const product = ProductsMock.DEPOSIT_ACCOUNT[0];
    component.configureFront(product);
    expect(component.minPayment).toEqual(635972.58);
    expect(component.totalPayment).toEqual(3770084.79);
  });

  it('setClass', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spyAdd = spyOn(dom, 'addClass');
    const spyRemoveMult = spyOn(dom, 'removeMultipleClass');

    component.setClass('2');

    expect(spyRemoveMult).toHaveBeenCalledWith(
      '.form-radiobutton-contanier',
      'active',
    );
    expect(spyAdd).toHaveBeenCalledWith('.type-2', 'active');
  });

  it('setClassOtherValue', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spyAdd = spyOn(dom, 'addClass');
    const spyRemove = spyOn(dom, 'removeClass');
    component.editOtherValue = false;

    component.setClassOtherValue();

    expect(spyRemove).toHaveBeenCalledWith('.type-2', 'active');
    expect(spyAdd).toHaveBeenCalledWith('.type-2', 'editing');
    expect(component.editOtherValue).toBeTruthy();
  });

  it('setValue', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeClass');

    const spySetClass = spyOn(component, 'setClass');
    component.editOtherValue = true;

    component.formTwo = new FormGroup({
      option_to_pay: new FormControl('', Validators.required),
      amounttext: new FormControl('10', [Validators.min(1)]),
      comments: new FormControl(''),
    });

    component.setValue();

    expect(spyRemove).toHaveBeenCalledWith('.type-2', 'editing');
    expect(component.FINAL_VALUE).toEqual('10');
    expect(spySetClass).toHaveBeenCalledWith('2');
    expect(component.editOtherValue).toBeFalsy();
  });

  it('setValue for FINAL_VALUE is empty', () => {
    component.editOtherValue = true;

    component.formTwo = new FormGroup({
      option_to_pay: new FormControl('', Validators.required),
      amounttext: new FormControl('', [Validators.min(1)]),
      comments: new FormControl(''),
    });

    component.setValue();

    expect(component.editOtherValue).toBeFalsy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(component as any, '_initForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('submitData with option_pay equal to other_value', () => {
    const otherValue = component.OTHER_VALUE;
    const step = 3;
    const finalValue = '3500';
    component.FINAL_VALUE = finalValue;
    component.formTwo = new FormGroup({
      option_to_pay: new FormControl(otherValue, Validators.required),
      amounttext: new FormControl('', [Validators.min(1)]),
      comments: new FormControl(''),
    });

    const facade = TestBed.get(PaymentObligationsFacade);
    const spySetForm = spyOn(facade, 'setFormTwo');

    component.submitData();

    component.setStep.subscribe((result: number) => {
      expect(result).toEqual(step);
    });

    component.setStep.next(step);

    expect(component.formTwo.value.amounttext).toEqual(finalValue);
    expect(spySetForm).toHaveBeenCalledWith(component.formTwo.value);
  });

  it('submitData with option_pay is not equal to other_value', () => {
    const optionPay = 3500;
    component.formTwo = new FormGroup({
      option_to_pay: new FormControl(optionPay, Validators.required),
      amounttext: new FormControl('', [Validators.min(1)]),
      comments: new FormControl(''),
    });

    const facade = TestBed.get(PaymentObligationsFacade);
    spyOn(facade, 'setFormTwo');

    component.submitData();

    expect(component.formTwo.value.amounttext).toEqual(optionPay);
  });

  it('doFindProductData', () => {
    const products = ProductsMock.DEPOSIT_ACCOUNT;
    const prod = component.doFindProductData('101010', products);
    expect(JSON.stringify(prod)).toEqual(JSON.stringify(products[0]));
  });
});
