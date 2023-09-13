import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthSession } from '@core/services/auth-session';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
  ReCaptchaV3Service,
} from 'ng-recaptcha';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      providers: [
        SecurityService,
        Security,
        GlobalDataService,
        ReCaptchaV3Service,
        AuthSession,
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
    }),
  );

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.saveUser('3');
    service.logOut();
    expect(service).toBeTruthy();
  });
});
