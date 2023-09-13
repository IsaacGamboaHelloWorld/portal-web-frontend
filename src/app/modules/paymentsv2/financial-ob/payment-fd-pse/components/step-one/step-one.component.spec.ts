import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { NavigatePayment } from '../../../payment/components/navigate/routes';
import { PaymentObligationsFacade } from '../../../payment/payment.facade';
import { StepPaymentPseEnum } from '../../constants/step-payment-pse.enum';
import { ISetFormOne } from '../../entities/step-form-one.interface';
import { NavigatePaymentFD } from '../../navigate/routes';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

import { StepOneComponent } from './step-one.component';

describe('Payment FD StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [StepOneComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentFreeDestinationModel,
          useClass: PaymentFreeDestinationModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: FinancialOpFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentObligationsFacade,
          useClass: PaymentsV2ModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.form = new FormGroup({
      index: new FormControl('', Validators.required),
      origin: new FormControl(null),
      destination: new FormControl(null),
    });
    expect(component).toBeTruthy();
  });

  it('next for indexSelected === -1', () => {
    const index = -1;
    (component as any).indexSelected = index;

    component.form = new FormGroup({
      index: new FormControl('', Validators.required),
      origin: new FormControl(null),
      destination: new FormControl(null),
    });

    const router = TestBed.get(Router);
    const spyNavigate = spyOn(router, 'navigate');

    const model = TestBed.get(PaymentFreeDestinationModel);
    const spyFormOne = spyOn(model, 'setFormOne');
    const spySetStep = spyOn(model, 'setStep');
    const spyResetStep = spyOn(model, 'resetStep');

    const form: ISetFormOne = {
      origin: null,
      destination: null,
      index,
    };

    component.next();

    expect(spyFormOne).toHaveBeenCalledWith(form);
    expect(spyNavigate).toHaveBeenCalledWith([NavigatePaymentFD.step2]);
    expect(spySetStep).toHaveBeenCalledWith(StepPaymentPseEnum.step_2);
    expect(spyResetStep).not.toHaveBeenCalled();
  });

  it('next for indexSelected !== -1', () => {
    const index = 1;
    (component as any).indexSelected = index;

    component.form = new FormGroup({
      index: new FormControl('', Validators.required),
      origin: new FormControl(null),
      destination: new FormControl(null),
    });

    const router = TestBed.get(Router);
    const spyNavigate = spyOn(router, 'navigate');

    const model = TestBed.get(PaymentFreeDestinationModel);
    const spyFormOne = spyOn(model, 'setFormOne');
    const spySetStep = spyOn(model, 'setStep');
    const spyResetStep = spyOn(model, 'resetStep');

    const form: ISetFormOne = {
      origin: null,
      destination: null,
      index,
    };

    component.next();

    expect(spyFormOne).not.toHaveBeenCalledWith(form);
    expect(spyNavigate).toHaveBeenCalledWith([NavigatePayment.step2]);
    expect(spySetStep).not.toHaveBeenCalledWith(StepPaymentPseEnum.step_2);
    expect(spyResetStep).toHaveBeenCalled();
  });

  it('selectCard', () => {
    const index = 0;
    (component as any).indexSelected = 1;

    component.form = new FormGroup({
      index: new FormControl('', Validators.required),
      origin: new FormControl(null),
      destination: new FormControl(null),
    });

    component.selectCard(index);

    expect((component as any).indexSelected).toEqual(index);
  });
});
