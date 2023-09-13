import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { TwofactorauthModule } from '@app/shared/two-factor-auth/twofactorauth.module';
import { TwoFactorAuthService } from '@app/shared/two-factor-auth/twofactorauth.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { ApplicationModelMock } from '../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { TwoFaGlobalComponent } from './two-fa-global.component';

describe('TwoFaGlobalComponent', () => {
  let component: TwoFaGlobalComponent;
  let fixture: ComponentFixture<TwoFaGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TestingModule,
        TwofactorauthModule,
        BtnModule,
      ],
      declarations: [TwoFaGlobalComponent],
      providers: [
        DialogConfig,
        SecurityService,
        Security,
        TwoFactorAuthService,
        ReCaptchaV3Service,
        AuthSession,
        ManipulateDomService,
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
