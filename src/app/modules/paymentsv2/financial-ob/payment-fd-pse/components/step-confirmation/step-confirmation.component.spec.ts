import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { TypeCommercePse } from '@app/core/constants/type_commerce_pse';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { AuthSession } from '@app/core/services/auth-session';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { environment } from '@environment';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { getSecureMdmMock } from '../../../../../../../../test-helpers/mocks/data/code-auth.mock';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IActiveFinancialOpPaymentPayments } from '../../../store/reducers/selected-payment.reducer';
import { TypePaymentPse } from '../../constants/type-payment-pse.enum';
import { TypePerson } from '../../constants/type-person.enum';
import { IPaymentPseRequest } from '../../entities/payment-transaction-pse.interface';
import { ISetFormThree } from '../../entities/step-form-three.interface';
import { ISetFormTwo } from '../../entities/step-form-two.interface';
import { PsePrivateService } from '../../services/pse-private.service';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from '@app/core/pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { StepConfirmationComponent } from './step-confirmation.component';

describe('Payment FD StepConfirmationComponent', () => {
  let component: StepConfirmationComponent;
  let fixture: ComponentFixture<StepConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [
        StepConfirmationComponent,
        CardTypeclassPipe,
        CardTypeProductPipe,
        CardFranchiseTypePipe,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
        TypeCreditCardPipe,
      ],
      providers: [
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
        ManipulateDomService,
        PsePrivateService,
        SecurityService,
        Security,
        ReCaptchaV3Service,
        AuthSession,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConfirmationComponent);
    component = fixture.componentInstance;
    spyOn(window, 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitData', () => {
    (component as any).countRedirectPse = 10;
    component.submitData();
    expect((component as any).countRedirectPse).toBe(0);
  });

  it('_mapPaymentRequest', () => {
    const paymentSelected: IActiveFinancialOpPaymentPayments = {
      activePayment: {
        accountId: '121221',
        accountType: 'CREDIT',
        bank: '',
        loanName: '',
        bankName: '',
        newLoan: true,
        paymentInformation: '',
        paymentId: '',
        brandId: '',
      },
    };
    const formTwo: ISetFormTwo = {
      type_person: TypePerson.NATURAL,
      bankId: '1059',
      bankName: 'BANCAMIA',
      email: 'correo@correo.com',
    };
    const formThree: ISetFormThree = {
      amountText: 1000,
    };

    const userInfoData = getSecureMdmMock;

    const request: IPaymentPseRequest = {
      paymentData: {
        commerceCode: TypeCommercePse.CREDIT,
        productType: TYPE_ACCOUNTS.FREE_DESTINATION,
        productId: paymentSelected.activePayment.accountId,
        amount: formThree.amountText,
        bank: {
          bankId: formTwo.bankId,
          bankName: formTwo.bankName,
        },
        paymentType: TypePaymentPse.PayObligation,
        firstName: userInfoData['firstName'],
        lastName: userInfoData['lastName'],
        description: '',
        emailAddress: formTwo.email,
        legalUserType: formTwo.type_person,
        invoice: paymentSelected.activePayment.accountId,
        redirectSuccessUrl: environment.url_return_of_pse,
      },
    };

    const model = TestBed.get(PaymentFreeDestinationModel);
    const spy = spyOn(model, 'fetchInitPaymentPse');

    (component as any)._mapPaymentRequest(
      paymentSelected,
      formTwo,
      formThree,
      userInfoData,
    );

    expect(spy).toHaveBeenCalledWith(request);
  });

  it('formTwo$', () => {
    const model = TestBed.get(PaymentFreeDestinationModel);
    const spy = spyOn(model, 'formTwo$');
    const result = component.formTwo$;
    expect(result).toEqual(spy);
  });
});
