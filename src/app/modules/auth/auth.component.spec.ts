import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthSession } from '@app/core/services/auth-session';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { AuthService } from '../auth-old/services/auth.service';
import { SecurityService } from '../security/services/security.service';
import { Security } from '../security/utils/security';

import { AuthComponent } from './auth.component';
import { AuthModel } from './store/model/auth.model';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      declarations: [AuthComponent],
      providers: [
        AuthService,
        SecurityService,
        Security,
        AuthSession,
        ManipulateDomService,
        {
          provide: AuthModel,
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
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
