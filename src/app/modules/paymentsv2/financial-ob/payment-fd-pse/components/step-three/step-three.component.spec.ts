import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { ISetFormThree } from '../../entities/step-form-three.interface';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

import { StepThreeComponent } from './step-three.component';

describe('Payment FD StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [StepThreeComponent],
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next', () => {
    const model = TestBed.get(PaymentFreeDestinationModel);
    const spyFormThree = spyOn(model, 'setFormThree');

    const amountText = component.amountTextAlias.value;
    const formThree: ISetFormThree = {
      amountText,
    };

    component.next();

    expect(spyFormThree).toHaveBeenCalledWith(formThree);
  });

  it('formThree$', () => {
    const model = TestBed.get(PaymentFreeDestinationModel);
    const spy = spyOn(model, 'formThree$');

    const result = component.formThree$;

    expect(result).toEqual(spy);
  });
});
