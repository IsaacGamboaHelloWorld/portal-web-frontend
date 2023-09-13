import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PdfMock } from '../../../../../../../test-helpers/mocks/data/pdf.mock';
import { StatementMock } from '../../../../../../../test-helpers/mocks/data/statements.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { environment } from '../../../../../../environments/environment';
import { IPdfdata } from '../../../../../core/interfaces/statement/pdfdata';
import { StatementsService } from './statements.service';

describe('StatementsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: StatementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [StatementsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(StatementsService);
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

  it('should be returned Observable< StatementsInfo >', () => {
    service.getPeriods('1', '2').subscribe((data: any) => {
      expect(data.periods.length).toBe(6);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.statements,
    );
    expect(req.request.method).toBe('POST');
    req.flush(StatementMock);
  });

  it('should be returned Observable< PdfInterface >', () => {
    const pdfInfo = {
      documentType: 'CC',
      endDate: '03/01/2019',
      periodName: 'abril',
      startDate: '03/01/2019',
    };

    service.getPdf('1', '2', pdfInfo).subscribe((pdfData: IPdfdata) => {
      expect(pdfData.base64).toString();
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pdf,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PdfMock);
  });
});
