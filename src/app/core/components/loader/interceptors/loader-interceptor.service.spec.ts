import { TestBed } from '@angular/core/testing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalComponent } from '@app/shared/modal/modal.component';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { environment } from '@environment';
import * as npm from '@root/package.json';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { LoaderInterceptor } from './loader-interceptor.service';

describe('LoaderInterceptor', () => {
  let service: LoaderInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TestingModule],
      providers: [
        LoaderInterceptor,
        ModalService,
        ManipulateDomService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ModalComponent],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [ModalComponent] },
    });

    service = TestBed.get(LoaderInterceptor);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be showLoader', () => {
    expect(service.showLoader()).toBe();
  });
  it('should be removeRequest', () => {
    const he: object = {
      normalizedNames: {},
      lazyUpdate: null,
      headers: {},
      lazyInit: null,
    };
    const pa: object = {
      updates: null,
      cloneFrom: null,
      encoder: {},
      map: {},
    };

    const req: any = {
      url: `${npm.localhost}/api/enrollment`,
      body: '',
      reportProgress: false,
      withCredentials: false,
      responseType: 'text',
      method: 'POST',
      headers: he,
      params: pa,
      urlWithParams: `${npm.localhost}/api/enrollment`,
    };
    service.requests.push(req);
    expect(service.removeRequest(req)).toBe();
  });

  it('should be _findValue', () => {
    expect(
      service._findValue(
        `${environment.api.base}${environment.api.services.code_auth.allowed}`,
        environment.api.services.code_auth.allowed,
      ),
    ).toBe(true);
  });

  it('should be created', () => {
    const serviceInt: LoaderInterceptor = TestBed.get(LoaderInterceptor);
    expect(serviceInt).toBeTruthy();
  });
});
