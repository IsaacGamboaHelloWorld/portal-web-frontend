import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingModule } from './../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from './../../../../core/services/manipulate-dom/manipulate-dom.service';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../../test-helpers/mocks/models/auth.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { PaymentFdPseContanier } from './payment-fd-pse.container';
import { PaymentFreeDestinationModel } from './store/models/payment-free-destination.model';

describe('PaymentFdPseContanier', () => {
  let component: PaymentFdPseContanier;
  let fixture: ComponentFixture<PaymentFdPseContanier>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [PaymentFdPseContanier],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        AuthService,
        AuthSession,
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
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFdPseContanier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
