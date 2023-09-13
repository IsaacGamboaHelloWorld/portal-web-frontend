import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { BillsUserService } from './bills-user.service';

describe('BillsUserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: BillsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [BillsUserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(BillsUserService);
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

  it('allRegisteredBills', () => {
    const mock = {};
    service.allRegisteredBills().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.allRegistered,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('billsToPay', () => {
    const mock = {};
    service.billsToPay().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBill,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('searchBillCompany', () => {
    const mock = {};
    service.searchBillCompany('data').subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base +
        environment.api.services.bills.agreementsAvailables,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('saveCompany', () => {
    const mock = {};
    const data = {
      company_code: 1,
      company_name: '',
      billId: '1',
    };
    service.saveCompany(data as any).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.addAgreement,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
