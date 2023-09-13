import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { ApplicationModelMock } from '../../../../test-helpers/mocks/models/application.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { LogguedGuard } from './loggued.guard';

describe('LogguedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      providers: [
        LogguedGuard,
        SecurityService,
        Security,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  it('should ...', inject([LogguedGuard], (guard: LogguedGuard) => {
    guard.canActivate();
    expect(guard).toBeTruthy();
  }));
});
