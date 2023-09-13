import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { AuthSession } from '@core/services/auth-session';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { AuthContainer } from './auth.container';

describe('AuthContainer', () => {
  let component: AuthContainer;
  let fixture: ComponentFixture<AuthContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      declarations: [AuthContainer],
      providers: [
        AuthService,
        SecurityService,
        Security,
        AuthSession,
        ManipulateDomService,
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
