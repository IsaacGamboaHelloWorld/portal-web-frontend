import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { ModalModule } from '@app/shared/modal/modal.module';
import { AuthSession } from '@core/services/auth-session';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { PwaService } from '@core/services/pwa/pwa.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { of } from 'rxjs';
import { ApplicationModelMock } from '../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../test-helpers/mocks/models/auth.model.mock';
import { DialogConfigMock } from '../../test-helpers/mocks/models/dialog-popup-block.mock';
import { TestingModule } from '../../test-helpers/testing.module';
import { AppComponent } from './app.component';
import { TwoFaGlobalComponent } from './core/components/two-fa-global/two-fa-global.component';
import { AuthModel } from './modules/auth/store/model/auth.model';
import { DialogConfig } from './shared/modal/services/dialog-config';
import { Action } from './shared/two-factor-auth/models/action-code';
import { Challenge } from './shared/two-factor-auth/models/challenge-type';
import {
  CancelChallenge,
  RequiredChallenge,
  SuccessfulChallenge,
} from './shared/two-factor-auth/models/events-challenge';
import { TwoFactorAuthService } from './shared/two-factor-auth/twofactorauth.service';
import { TealiumUtagService } from './tealium/utag.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let twoFaGlobalComponent: TwoFaGlobalComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fixtureTwoFaGlobalComponent: ComponentFixture<TwoFaGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        HttpClientTestingModule,
        ModalModule,
        RecaptchaV3Module,
      ],
      declarations: [AppComponent, TwoFaGlobalComponent],
      providers: [
        SecurityService,
        Security,
        AuthService,
        ManipulateDomService,
        TwoFactorAuthService,
        AuthSession,
        PwaService,
        TealiumUtagService,
        {
          provide: DialogConfig,
          useClass: DialogConfigMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    // tslint:disable-next-line:only-arrow-functions
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixtureTwoFaGlobalComponent = TestBed.createComponent(TwoFaGlobalComponent);
    twoFaGlobalComponent = fixtureTwoFaGlobalComponent.componentInstance;
    fixtureTwoFaGlobalComponent.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(app).toBeTruthy();
    component.ngOnDestroy();
  });

  it('should be validate RequiredChallenge', inject(
    [TwoFactorAuthService],
    (twoFa: any) => {
      twoFa.events = of(
        new RequiredChallenge({
          action: Action.CHALLENGE,
          challenges: [Challenge.TOTP, Challenge.ENHANCED],
          challengeInformation: {
            challenge: Challenge.TOTP,
            parameters: {
              length: 6,
            },
          },
          success: true,
          transactionId: '1234',
          request: {
            ipAddress: '1.1.1.1',
          },
          dateTime: '2020-12-10T16:31:23.942',
        }),
      );
      twoFaGlobalComponent.ngOnInit();
    },
  ));

  it('should be validate SuccessfulChallenge', inject(
    [TwoFactorAuthService, Router],
    (twoFa: any, router: Router) => {
      twoFa.events = of(
        new SuccessfulChallenge({
          action: Action.ALLOW,
          success: true,
          transactionId: '1234',
          request: {
            ipAddress: '1.1.1.1',
          },
          dateTime: '2020-12-10T16:31:23.942',
        }),
      );
      twoFaGlobalComponent.ngOnInit();
    },
  ));

  it('should be validate CancelChallenge', inject(
    [TwoFactorAuthService],
    (twoFa: any) => {
      twoFa.events = of(new CancelChallenge(null));
      component.ngOnInit();
    },
  ));
});
