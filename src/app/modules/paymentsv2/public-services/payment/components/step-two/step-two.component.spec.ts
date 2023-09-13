import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from './../../../../../../shared/modal/services/modal.service';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClassNotification } from '@app/core/constants/notification';
import { FinancialOpFacade } from '@app/modules/paymentsv2/financial-ob/finantial-ob.facade';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ProductDepositeAccountDetailsMock } from '../../../../../../../../test-helpers/mocks/data/products-all.mock';
import { ProductsMock } from '../../../../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../../../core/pipes/remove-value.pipe';
import { CurrencyModule } from '../../../../../../shared/currency/currency.module';
import { PublicServicesFacade } from '../../../public-services.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { PaymentServiceFacade } from '../../payment.facade';
import { StepTwoComponent } from './step-two.component';

describe('StepPaymentTwoComponent in Public Services', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        ReactiveFormsModule,
        FormsModule,
        CurrencyModule.forRoot(),
      ],
      declarations: [StepTwoComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FinancialOpFacade,
          useValue: facadeMock,
        },
        {
          provide: PaymentServiceFacade,
          useValue: facadeMock,
        },
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        TranslateService,
        UtilsService,
        ModalService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitData', () => {
    component.formSecondStep = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
    (component as any)._productDefault = ProductsMock.DEPOSIT_ACCOUNT[0];
    const facade = TestBed.get(PaymentServiceFacade);
    const spy = spyOn(facade, 'setFormTwo');

    component.submitData();

    expect(spy).toHaveBeenCalled();
  });

  it('submitData for _amount > _balance', () => {
    component.formSecondStep = new FormGroup({
      amount: new FormControl('5000', Validators.required),
    });
    (component as any)._productDefault =
      ProductDepositeAccountDetailsMock.DEPOSIT_ACCOUNT[0];
    const facade = TestBed.get(PaymentServiceFacade);
    spyOn(facade, 'setFormTwo');

    component.submitData();
  });

  it('submitData witouth productAccountBalances', () => {
    component.formSecondStep = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
    (component as any)._productDefault = {
      productAccountBalances: null,
    };
    const facade = TestBed.get(PaymentServiceFacade);
    spyOn(facade, 'setFormTwo');

    component.submitData();
  });

  it('_insufficientBalance', () => {
    const facade = TestBed.get(PaymentServiceFacade);
    const spy = spyOn(facade, 'notificationOpen');
    (component as any)._insufficientBalance();
    expect(spy).toHaveBeenCalledWith(
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP2.INSUFFICIENT_BALANCE',
      true,
      ClassNotification.ERROR,
    );
  });
});
