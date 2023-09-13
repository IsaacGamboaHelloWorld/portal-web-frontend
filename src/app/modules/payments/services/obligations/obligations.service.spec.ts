import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ObligationsService } from './obligations.service';

describe('BillsUserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ObligationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ObligationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(ObligationsService);
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

  it('doGetObligations', () => {
    const mock = {};
    service.doGetObligations().subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.loans,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('doPayObligations', () => {
    const mock = {};
    const request = {
      account_destination: {
        accountId: '',
        accountType: '',
      },
      obligations_origin: {
        accountId: '',
        accountType: '',
        accountName: '',
      },
      amount: '',
    };
    service.doPayObligations(request).subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.payment,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
