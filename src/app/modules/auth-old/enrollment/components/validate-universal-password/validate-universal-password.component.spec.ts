import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { ApplicationModelMock } from '../../../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ValidateUniversalPasswordComponent } from './validate-universal-password.component';

describe('ValidateUniversalPasswordComponent', () => {
  let component: ValidateUniversalPasswordComponent;
  let fixture: ComponentFixture<ValidateUniversalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApplicationModel, useClass: ApplicationModelMock },
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        AuthSession,
        SecurityService,
        Security,
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ValidateUniversalPasswordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateUniversalPasswordComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
