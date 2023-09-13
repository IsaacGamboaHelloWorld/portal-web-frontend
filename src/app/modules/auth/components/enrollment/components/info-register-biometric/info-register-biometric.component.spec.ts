import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { OtpAthModelMock } from '@root/test-helpers/mocks/models/otp-ath.model.mock';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { InfoRegisterBiometricComponent } from './info-register-biometric.component';

describe('InfoRegisterBiometricComponent', () => {
  let component: InfoRegisterBiometricComponent;
  let fixture: ComponentFixture<InfoRegisterBiometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApplicationModel, useClass: ApplicationModelMock },
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: OtpAthModel,
          useClass: OtpAthModelMock,
        },
        WebAuthnService,
        AuthSession,
        SecurityService,
        Security,
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [InfoRegisterBiometricComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRegisterBiometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasOffers', () => {
    component.listDesc = [{ TEXT: '' }];
    const result = component.listDesc;
    expect(result).toBeTruthy();
  });
});
