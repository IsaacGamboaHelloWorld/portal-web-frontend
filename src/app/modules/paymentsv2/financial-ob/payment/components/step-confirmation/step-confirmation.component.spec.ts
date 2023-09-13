import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { PaymentModelMock } from '../../../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../../../../payments/payment.model';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { StepConfirmationComponent } from './step-confirmation.component';

describe('StepConfirmationFinancialPaymentComponent', () => {
  let component: StepConfirmationComponent;
  let fixture: ComponentFixture<StepConfirmationComponent>;
  let model: PaymentModel;
  let facade: PaymentObligationsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [StepConfirmationComponent, RemoveValuePipe],
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
    fixture = TestBed.createComponent(StepConfirmationComponent);
    model = TestBed.get(PaymentModel);
    facade = TestBed.get(PaymentObligationsFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitData', () => {
    component.submitData();
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

  it('payment$', () => {
    const result = component.payment$;
    expect(result).toEqual(model.payment$);
  });
});
