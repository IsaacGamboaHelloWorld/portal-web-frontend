import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: DocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(DocumentsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    injector = null;
    httpMock = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generateCertificateGmf', () => {
    const mock = {};
    service.generateCertificateGmf('2020').subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tax_certificates,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('generateCertificateIncome', () => {
    const mock = {};
    service.generateCertificateIncome('2020').subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.income_certificates,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('generateCertificateAccount', () => {
    const mock = {};
    service.generateCertificateAccount({}).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.accountCertificate,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
