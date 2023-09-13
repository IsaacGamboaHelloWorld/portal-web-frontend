import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { AuthSession } from '@core/services/auth-session';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { PwaService } from './pwa.service';

describe('PwaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      providers: [
        PwaService,
        SecurityService,
        Security,
        GlobalDataService,
        AuthSession,
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
    }),
  );

  it('should be created', () => {
    const service: PwaService = TestBed.get(PwaService);
    expect(service).toBeTruthy();
  });
});
