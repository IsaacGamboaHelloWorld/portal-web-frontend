import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthSession } from '@core/services/auth-session';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { PwaService } from '@core/services/pwa/pwa.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { AddPwaComponent } from './add-pwa.component';

describe('AddPwaComponent', () => {
  let component: AddPwaComponent;
  let fixture: ComponentFixture<AddPwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, RecaptchaV3Module, HttpClientTestingModule],
      declarations: [AddPwaComponent],
      providers: [
        PwaService,
        SecurityService,
        Security,
        GlobalDataService,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
