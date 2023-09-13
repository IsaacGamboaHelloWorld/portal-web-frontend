import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalModule } from '@app/shared/modal/modal.module';
import { AuthSession } from '@core/services/auth-session';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { AuthModelOld } from '../auth.model';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        ModalModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent,
          },
        ]),
      ],
      declarations: [LoginComponent],
      providers: [
        SecurityService,
        Security,
        AuthSession,
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
        {
          provide: ManipulateDomService,
          useValue: {
            containsClass: () => true,
            addClass: () => {},
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    // tslint:disable-next-line:only-arrow-functions
    window['rsaFunc'] = () => '12345678901234567890';

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.toggleInputType();
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
