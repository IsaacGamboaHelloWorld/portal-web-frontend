import { HttpUrlEncodingCodec } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationModel } from '@app/application.model';
import { Navigate } from '@app/core/constants/navigate';
import { KeyFuncionalityAssetsPipe } from '@app/core/pipes/key-funcionality-assets/key-funcionality-assets.pipe';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { AuthSession } from '@app/core/services/auth-session';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { CodeAuthModel } from '@app/modules/code-auth/store/model/code-auth.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { of } from 'rxjs';
import { ActivateTcModelMock } from '../../../../../../test-helpers/mocks/models/activateTc.model.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { AuthModelMock } from '../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { responseOptionsModuleMock } from './../../../../../../test-helpers/mocks/data/options-modules.mock';

import { OptionNavDsComponent } from './option-nav-ds.component';

describe('OptionNavDsComponent', () => {
  let component: OptionNavDsComponent;
  let fixture: ComponentFixture<OptionNavDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        HttpClientTestingModule,
        RecaptchaV3Module,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        OptionNavDsComponent,
        RemoveValuePipe,
        KeyFuncionalityAssetsPipe,
      ],
      providers: [
        HttpUrlEncodingCodec,
        WebAuthnService,
        SecurityService,
        Security,
        ManipulateDomService,
        AuthSession,
        AuthService,
        ManipulateDomService,
        ChangeDetectorRef,
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
        { provide: ApplicationModel, useClass: ApplicationModelMock },
        {
          provide: CodeAuthModel,
          useClass: ActivateTcModelMock,
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
    fixture = TestBed.createComponent(OptionNavDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    (component as any).router = {
      events: of(new NavigationEnd(0, '', '')),
      url: '',
    };
    component.ngOnInit();
    expect(component.urlActive).toEqual('');
  });

  it('doLogout', () => {
    component.urlActive = 'lalal';
    const auth = TestBed.get(AuthService);
    const spy = spyOn(auth, 'logOut');
    component.doLogout();
    expect(spy).toHaveBeenCalled();
    expect(component.urlActive).toEqual('');
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('_mapOptionModules without data', () => {
    const data = null;
    const spySec = spyOn(component as any, '_mapSecurityOptions');
    (component as any)._mapOptionModules(data);
    expect(spySec).not.toHaveBeenCalled();
  });

  it('_mapOptionModules with data security', () => {
    const data = responseOptionsModuleMock.data;
    const spySec = spyOn(component as any, '_mapSecurityOptions');
    (component as any)._mapOptionModules(data);
    expect(spySec).toHaveBeenCalledWith(data.security.options);
  });

  it('_mapOptionModules without data security', () => {
    const data = {
      ...responseOptionsModuleMock.data,
      security: {
        options: null,
      },
    };
    const spySec = spyOn(component as any, '_mapSecurityOptions');
    (component as any)._mapOptionModules(data);
    expect(spySec).not.toHaveBeenCalled();
  });

  it('_mapOptionModules with data document', () => {
    const data = responseOptionsModuleMock.data;
    const spySec = spyOn(component as any, '_mapDocumentOptions');
    (component as any)._mapOptionModules(data);
    expect(spySec).toHaveBeenCalledWith(data.documents.options);
  });

  it('_mapOptionModules without data document', () => {
    const data = {
      ...responseOptionsModuleMock.data,
      documents: {
        options: null,
      },
    };
    const spyDoc = spyOn(component as any, '_mapDocumentOptions');
    (component as any)._mapOptionModules(data);
    expect(spyDoc).not.toHaveBeenCalled();
  });

  it('redirect', () => {
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    const url = '/';
    component.openedDocuments = true;
    component.openedSecurity = true;

    component.eventNavigate.subscribe((data: boolean) => {
      expect(data).toBeFalsy();
    });

    component.redirect(url);

    expect(spyNav).toHaveBeenCalledWith([url]);
    expect(component.openedSecurity).toBeFalsy();
    expect(component.openedDocuments).toBeFalsy();
  });

  it('toggleMenuSecurity', () => {
    component.openedSecurity = true;
    component.toggleMenuSecurity();
    expect(component.openedSecurity).toBeFalsy();
  });

  it('toggleMenuDocuments', () => {
    component.openedDocuments = true;
    component.toggleMenuDocuments();
    expect(component.openedDocuments).toBeFalsy();
  });
});
