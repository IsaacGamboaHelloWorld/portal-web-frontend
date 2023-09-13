import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { PaymentObligationsFacade } from '../../payment.facade';
import { StepOneComponent } from './step-one.component';

describe('StepOneFinancialPaymentComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepOneComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PaymentObligationsFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: FinancialOpFacade,
          useClass: PaymentsV2ModelMock,
        },
        UtilsService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitData', () => {
    component.formStart = new FormGroup({
      account_origin: new FormControl('', Validators.required),
      loan_destination: new FormControl('', Validators.required),
    });
    const facade = TestBed.get(PaymentObligationsFacade);
    const spy = spyOn(facade, 'setFormOne');
    component.submitData();
    expect(spy).toHaveBeenCalled();
  });
});
