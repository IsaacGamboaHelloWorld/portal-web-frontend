import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import {
  IDeleteServiceRequest,
  IRecurringPayment,
} from '../entities/public-services';
import { PublicServicesService } from './public-services.service';

describe('PublicServicesService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: PublicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [PublicServicesService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PublicServicesService);
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

  it('loadNextPublicServicesPayments', () => {
    const mock = {};
    service.loadNextPublicServicesPayments().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBill,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('allRegisteredPublicServices', () => {
    const mock = {};
    service.allRegisteredPublicServices().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.allRegistered,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('doDelete', () => {
    const mock = {};
    const request: IDeleteServiceRequest = {
      billerId: 43,
      billerNickname: 'Acueducto prueba',
      contract: 31056278,
      isBiller: true,
    };
    service.doDelete(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.delete,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('saveRecurring with editMode true', () => {
    const mock = {};
    const request: IRecurringPayment = {
      billerId: '00000043',
      billerNickname: 'Acueducto prueba',
      contract: '31056278',
      reference: '31056278',
      paymentType: 'X_DAYS_BEFORE_DUE_DATE',
      maxAmount: '1000',
      daysBeforeAfterExpiration: '0',
      originAccountId: '230150001576',
      originAccountType: 'DEPOSIT_ACCOUNT',
      editMode: true,
    };
    service.saveRecurring(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.recurring.update,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('saveRecurring with editMode false', () => {
    const mock = {};
    const request: IRecurringPayment = {
      billerId: '00000043',
      billerNickname: 'Acueducto prueba',
      contract: '31056278',
      reference: '31056278',
      paymentType: 'X_DAYS_BEFORE_DUE_DATE',
      maxAmount: '1000',
      daysBeforeAfterExpiration: '0',
      originAccountId: '230150001576',
      originAccountType: 'DEPOSIT_ACCOUNT',
      editMode: false,
    };
    service.saveRecurring(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.recurring.create,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('deleteRecurring', () => {
    const mock = {};
    const request: IRecurringPayment = {
      billerId: '00000043',
      billerNickname: 'Acueducto prueba',
      contract: '31056278',
      reference: '31056278',
      paymentType: 'X_DAYS_BEFORE_DUE_DATE',
      maxAmount: '1000',
      daysBeforeAfterExpiration: '0',
      originAccountId: '230150001576',
      originAccountType: 'DEPOSIT_ACCOUNT',
      editMode: false,
    };
    service.deleteRecurring(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.recurring.delete,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('getBillDetail', () => {
    const mock = {};
    const data = {};
    service.getBillDetail(data).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.paymentBillDetail,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
