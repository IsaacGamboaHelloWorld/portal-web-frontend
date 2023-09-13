import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { AuthSession } from '@core/services/auth-session';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { getSecureMdmMock } from '../../../../../../test-helpers/mocks/data/code-auth.mock';
import { AuthModelMock } from '../../../../../../test-helpers/mocks/models/auth.model.mock';
import { MainContainerModelMock } from '../../../../../../test-helpers/mocks/models/main-container.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule, RecaptchaV3Module],
      providers: [
        SecurityService,
        Security,
        AuthSession,
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: MainContainerModelMock,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '',
        },
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name$', () => {
    component.name$.subscribe((result: string) => {
      expect(result).toEqual(
        getSecureMdmMock.PartyAssociation[0].PersonInfo.PersonName[0]
          .FirstName +
          ' ' +
          getSecureMdmMock.PartyAssociation[0].PersonInfo.PersonName[0]
            .LastName,
      );
    });
  });
});
