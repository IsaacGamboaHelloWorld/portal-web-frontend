import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PdfMock } from '../../../../../../../test-helpers/mocks/data/pdf.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { environment } from '../../../../../../environments/environment';
import { IPdfdata } from '../../../../../core/interfaces/certificates/pdfdata';
import { CertificatesService } from './certificates.service';

describe('CertificatesService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: CertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [CertificatesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(CertificatesService);
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

  it('should be returned Observable< PdfInterface >', () => {
    service
      .getPdf('12341234', 'DEPOSIT_ACCOUNT', true)
      .subscribe((pdfData: IPdfdata) => {
        expect(pdfData.base64).toBe(PdfMock.base64);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.accountCertificate,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PdfMock);
  });
});
