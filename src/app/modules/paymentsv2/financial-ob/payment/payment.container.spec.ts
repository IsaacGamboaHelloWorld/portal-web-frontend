import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Navigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CurrencyModule } from '../../../../shared/currency/currency.module';
import { PaymentModel } from '../../../payments/payment.model';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { FinancialOpService } from '../services/financial-op.service';
import { StepLineTime } from '../store/state/financial-op-module.state';
import { NavigatePayment } from './components/navigate/routes';
import { PaymentContainer } from './payment.container';
import { PaymentObligationsFacade } from './payment.facade';

describe('PaymentComponent in financial ob', () => {
  let component: PaymentContainer;
  let fixture: ComponentFixture<PaymentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CurrencyModule.forRoot()],
      declarations: [PaymentContainer],
      providers: [
        {
          provide: FinancialOpFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentObligationsFacade,
          useClass: PaymentsV2ModelMock,
        },
        FinancialOpService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
        TranslateService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component as any, '_validateSteps');
    expect(component).toBeTruthy();
  });

  it('_hideNavigation', () => {
    component.showTimeLine = true;
    component.title = 'title';
    component.subTitle = 'subTitle';

    (component as any)._hideNavigation();

    expect(component.showTimeLine).toBeFalsy();
    expect(component.title).toEqual('');
    expect(component.subTitle).toEqual('');
  });

  it('setStep', () => {
    const step = 2;
    const stepLine: StepLineTime = {
      step,
    };

    const facedeParent = TestBed.get(FinancialOpFacade);
    const spy = spyOn(facedeParent, 'setStep');
    component.setStep(step);
    expect(component.step).toEqual(step);
    expect(spy).toHaveBeenCalledWith(stepLine);
  });

  it('activePayment$', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const result = component.activePayment$;
    expect(result).toEqual(facade.selectActiveProduct$);
  });

  it('productActive$', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const result = component.productActive$;
    expect(result).toEqual(facade.selectActivePayment$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('items$', () => {
    const message = ['A quién', 'Por cuánto', 'Cuándo'];
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'get').and.returnValue(of(message));
    component.items$.subscribe((result: string[]) => {
      expect(result).toEqual(message);
    });
  });

  it('navigateInternal', () => {
    const result = component.navigateInternal;
    expect(result).toEqual(NavigatePayment);
  });

  it('backHome for IF', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const spy = spyOn(facade, 'setBackHome');

    component.backHome(true);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('backHome for ELSE', () => {
    const facade = TestBed.get(PaymentObligationsFacade);
    const spy = spyOn(facade, 'setBackHome');

    component.backHome(false);

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('_setStep', () => {
    const parent = TestBed.get(FinancialOpFacade);
    const spy = spyOn(parent, 'setStep');

    component._setStep(1);

    expect(spy).toHaveBeenCalledWith({ step: 1 });
  });

  it('setConfigStep case 1', () => {
    const response: StepLineTime = {
      step: 1,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigate.paymentsv2obligations);
  });

  it('setConfigStep case 2', () => {
    const response: StepLineTime = {
      step: 2,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigateInternal.step1);
  });

  it('setConfigStep case 3', () => {
    const response: StepLineTime = {
      step: 3,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigateInternal.step2);
  });

  it('setConfigStep case 4', () => {
    const response: StepLineTime = {
      step: 4,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigateInternal.step3);
  });

  it('setConfigStep case 5', () => {
    const response: StepLineTime = {
      step: 5,
    };
    const spy = spyOn(component as any, '_hideNavigation');

    (component as any).setConfigStep(response);

    expect(spy).toHaveBeenCalled();
  });

  it('setConfigStep default', () => {
    const response: StepLineTime = {
      step: 6,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigate.paymentsv2obligations);
  });
});
