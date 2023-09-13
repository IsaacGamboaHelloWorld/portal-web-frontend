import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { StatusProductPipe } from '../../../../../detail-product/pipes/status-product/status-product.pipe';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { StepThreeComponent } from './step-three.component';

describe('StepThreeFinancialPaymentComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepThreeComponent, RemoveValuePipe, StatusProductPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
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
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_initForm', () => {
    component.formThree = new FormGroup({
      date: new FormControl('', [Validators.required]),
      dueDate: new FormControl(''),
    });
    (component as any)._initForm();
    expect(component.formThree.get('date').value).toEqual('');
    expect(component.formThree.get('dueDate').value).toEqual('');
  });

  it('submitData', () => {
    const date = new Date();
    component.today = date;

    const facade = TestBed.get(PaymentObligationsFacade);
    const spy = spyOn(facade, 'setFormThree');

    component.submitData();

    expect(spy).toHaveBeenCalled();
    component.setStep.subscribe((data: any) => {
      expect(data).toEqual(4);
    });
  });
});
