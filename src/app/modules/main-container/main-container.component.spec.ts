import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSession } from '@app/core/services/auth-session';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { MainContainerModel } from '@modules/main-container/main-container.model';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../test-helpers/mocks/models/auth.model.mock';
import { MainContainerModelMock } from '../../../../test-helpers/mocks/models/main-container.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { AuthService } from '../auth/services/auth.service';
import { AuthModel } from '../auth/store/model/auth.model';
import { SecurityService } from '../security/services/security.service';
import { Security } from '../security/utils/security';
import { MainContainerComponent } from './main-container.component';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
      ],
      declarations: [MainContainerComponent],
      providers: [
        SecurityService,
        Security,
        AuthSession,
        AuthService,
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: MainContainerModel,
          useClass: MainContainerModelMock,
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
    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
