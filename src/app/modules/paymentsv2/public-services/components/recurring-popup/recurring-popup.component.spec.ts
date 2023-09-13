import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from './../../../../../shared/modal/services/modal.service';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ProductsMock } from '../../../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { PublicServicesFacade } from '../../public-services.facade';
import { RecurringPopupComponent } from './recurring-popup.component';

describe('RecurringPopupComponent in SP', () => {
  let component: RecurringPopupComponent;
  let fixture: ComponentFixture<RecurringPopupComponent>;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      declarations: [RecurringPopupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: PublicServicesFacade,
          useValue: facadeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringPopupComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_initForm', () => {
    const amount = '';
    const date = 0;
    const accountProd = null;
    const form = new FormGroup({
      account_origin: new FormControl(accountProd, [Validators.required]),
      amounttext: new FormControl(amount, [
        Validators.min(1),
        Validators.max(999999),
        Validators.required,
      ]),
      range: new FormControl(date, [Validators.required]),
    });
    (component as any)._initForm();
    expect(component.formRecurring.get('range').value).toEqual(0);
  });

  it('back', () => {
    component.stepOne = false;
    component.back();
    expect(component.stepOne).toBeTruthy();
  });

  it('setSecondStep', () => {
    component.stepOne = true;
    component.setSecondStep();
    expect(component.stepOne).toBeFalsy();
  });

  it('close', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'close');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('selectProductsOrigin$ for DEPOSIT_ACCOUNT', () => {
    component.selectProductsOrigin$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(
        JSON.stringify(ProductsMock.DEPOSIT_ACCOUNT),
      );
    });
  });

  it('selectProductsOrigin$ for CURRENT_ACCOUNT', () => {
    facadeMock.setInnerSelectedProductsOrigin = ProductsMock.CURRENT_ACCOUNT;
    component.selectProductsOrigin$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(
        JSON.stringify(ProductsMock.CURRENT_ACCOUNT),
      );
    });
  });

  it('recurring$', () => {
    const result = component.recurring$;
    expect(result).toEqual(facadeMock.selectRecurring$);
  });

  it('infoPayment$', () => {
    component.infoPayment$;
  });

  it('selectedPayment$', () => {
    const result = component.selectedPayment$;
    expect(result).toEqual(facadeMock.selectedPayment$);
  });

  it('selectedNoDataPayment$', () => {
    const result = component.selectedNoDataPayment$;
    expect(result).toEqual(facadeMock.selectedNotDataPayment$);
  });

  it('selectEditRecurring$', () => {
    const result = component.selectEditRecurring$;
    expect(result).toEqual(facadeMock.selectEditRecurring$);
  });

  it('recurringAlias', () => {
    const account_origin = new FormControl('account_origin');
    const form = new FormGroup({
      account_origin,
    });
    component.formRecurring = form;
    const result = component.recurringAlias;
    expect(result).toEqual(account_origin);
  });
});
