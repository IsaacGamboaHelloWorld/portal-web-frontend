import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';

import { AuthSession } from '@core/services/auth-session';
import { CoexistenceService } from 'app/modules/home/services/coexistence.service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { SecurityService } from '../../../security/services/security.service';
import { Security } from '../../../security/utils/security';
import { CoexistenceComponent } from './coexistence.component';

describe('CoexistenceComponent', () => {
  let component: CoexistenceComponent;
  let fixture: ComponentFixture<CoexistenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      declarations: [CoexistenceComponent],
      providers: [
        CoexistenceService,
        SecurityService,
        Security,
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoexistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
