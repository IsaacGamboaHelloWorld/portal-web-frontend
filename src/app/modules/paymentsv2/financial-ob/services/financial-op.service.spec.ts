import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { PaymentsHistoricalErrorsMock } from '../../../../../../test-helpers/mocks/data/payment.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { FinancialOpService } from './financial-op.service';

describe('FinancialOpService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: FinancialOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [FinancialOpService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(FinancialOpService);
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

  it('loadNextFinancialOpPayments', () => {
    const resp = {};
    service.loadNextFinancialOpPayments().subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBill,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });

  it('allRegisteredFinancialOp', () => {
    const resp = {};
    service.allRegisteredFinancialOp().subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.financial_op.registered,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });

  it('banks', () => {
    const resp = {};
    service.banks().subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.banks,
    );
    expect(req.request.method).toBe('GET');
    req.flush(resp);
  });

  it('banksLoans', () => {
    const resp = {};
    service.banksLoans('POPULAR').subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentbankLoans,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });

  it('doDelete', () => {
    const resp = {};
    const data = {
      loan: {
        accountId: '101010',
        accountType: 'DESPOSIT_ACCOUNT',
        bank: 'POPULAR',
      },
    };
    service.doDelete(data as any).subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.financial_op.delete,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });

  it('getHistoryPayments', () => {
    service.getHistoryPayments().subscribe((response: any) => {
      expect(response).toBe(PaymentsHistoricalErrorsMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.historicPayments,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PaymentsHistoricalErrorsMock);
  });
});
