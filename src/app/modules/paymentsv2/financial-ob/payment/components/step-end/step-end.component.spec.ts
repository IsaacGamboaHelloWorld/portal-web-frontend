import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { Navigate } from '@core/constants/navigate';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { PaymentModelMock } from '../../../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../../../../payments/payment.model';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { StepEndComponent } from './step-end.component';

describe('StepEndFinancialPaymentComponent', () => {
  let component: StepEndComponent;
  let fixture: ComponentFixture<StepEndComponent>;
  let facade: PaymentObligationsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepEndComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FinancialOpFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentObligationsFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEndComponent);
    facade = TestBed.get(PaymentObligationsFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_resetDisabled', () => {
    component.disabled = true;
    (component as any)._resetDisabled();
    expect(component.disabled).toBeFalsy();
  });

  it('stepOne$', () => {
    const result = component.stepOne$;
    expect(result).toEqual(facade.getStepOne$);
  });

  it('stepTwo$', () => {
    const result = component.stepTwo$;
    expect(result).toEqual(facade.getStepTwo$);
  });

  it('stepThree$', () => {
    const result = component.stepThree$;
    expect(result).toEqual(facade.getStepThree$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });
});
