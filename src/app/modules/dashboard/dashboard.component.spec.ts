import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@app/core/services/auth-session';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthModelMock } from '../../../../test-helpers/mocks/models/auth.model.mock';
import { MainContainerModelMock } from '../../../../test-helpers/mocks/models/main-container.model.mock';
import { NewsModelMock } from '../../../../test-helpers/mocks/models/news.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { AuthService } from '../auth/services/auth.service';

import { AuthModel } from '../auth/store/model/auth.model';
import { Security } from '../security/utils/security';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        AuthService,
        Security,
        ReCaptchaV3Service,
        AuthSession,
        {
          provide: NewsModel,
          useClass: NewsModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: MainContainerModelMock,
        },
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
