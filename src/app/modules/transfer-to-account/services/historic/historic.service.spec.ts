import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { HistoricService } from 'app/modules/transfer-to-account/services/historic/historic.service';
import { TransferMock } from '../../../../../../test-helpers/mocks/data/transfer-account.mock';

describe('HistoricService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: HistoricService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistoricService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(HistoricService);
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

  it('historicTransfer', () => {
    service.historicTransfer().subscribe((data: any) => {
      expect(data).toBe(TransferMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.historyTransfer,
    );
    expect(req.request.method).toBe('POST');
    req.flush(TransferMock);
  });

  it('pendingTransfer', () => {
    service.pendingTransfer().subscribe((data: any) => {
      expect(data).toBe(TransferMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pendingTransfer,
    );
    expect(req.request.method).toBe('POST');
    req.flush(TransferMock);
  });

  it('scheduledTransfer', () => {
    service.scheduledTransfer().subscribe((data: any) => {
      expect(data).toBe(TransferMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.scheduled.search,
    );
    expect(req.request.method).toBe('POST');
    req.flush(TransferMock);
  });
});
