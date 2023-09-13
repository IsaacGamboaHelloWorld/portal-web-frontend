import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { EnrollService } from './enroll-service.service';

describe('EnrollService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: EnrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [EnrollService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(EnrollService);
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

  it('searchBillCompany', () => {
    const mock = {};
    const request = 'PB';
    service.searchBillCompany(request).subscribe((result: any) => {
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
    const request = {
      company_code: '002',
      company_name: 'Banco Popular',
      billerId: '000043',
    } as any;
    service.saveCompany(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.addAgreement,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
