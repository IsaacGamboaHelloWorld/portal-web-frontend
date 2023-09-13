import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationModel } from '@app/application.model';
import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from '@app/core/pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { AuthSession } from '@app/core/services/auth-session';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TYPE_PAYMENTS } from '@app/modules/payments/home-payments/constants/types';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { StatusPaymentPseEnum } from '../../constants/status-payment-pse.enum';
import { PsePrivateService } from '../../services/pse-private.service';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

import { StepEndComponent } from './step-end.component';

describe('Payment FD StepEndComponent', () => {
  let component: StepEndComponent;
  let fixture: ComponentFixture<StepEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [
        StepEndComponent,
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
    fixture = TestBed.createComponent(StepEndComponent);
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

  it('redirect', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const url = component.navigate.home_payment;

    component.redirect(url);

    expect(spy).toHaveBeenCalledWith([url]);
  });

  it('selectedPayment$', () => {
    const facade = TestBed.get(FinancialOpFacade);
    const spy = spyOn(facade, 'selectedPayment$');

    const result = component.selectedPayment$;

    expect(result).toEqual(spy);
  });

  it('statusPaymentConst', () => {
    const result = component.statusPaymentConst;
    expect(result).toEqual(StatusPaymentPseEnum);
  });

  it('getTypePayment', () => {
    const result = component.getTypePayment;
    expect(result).toEqual(TYPE_PAYMENTS);
  });
});
