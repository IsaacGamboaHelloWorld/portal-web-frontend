import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { RegisterBiometricComponent } from './register-biometric.component';

describe('ValidateUniversalPasswordComponent', () => {
  let component: RegisterBiometricComponent;
  let fixture: ComponentFixture<RegisterBiometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApplicationModel, useClass: ApplicationModelMock },
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        WebAuthnService,
        AuthSession,
        SecurityService,
        Security,
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RegisterBiometricComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBiometricComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
