import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import {
  ICreateUserAlertRequest,
  ICreateUserAlertResponse,
  ISearchUserAlertsResponse,
} from '../entities/alerts';
import { AlertsService } from './alerts.service';

import { environment } from '@environment';
import {
  CreateUserAlertV1Mock,
  SearchUserAlertsMock,
} from '../../../../../test-helpers/mocks/data/alerts.mock';

describe('AlertsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [AlertsService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(AlertsService);
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

  it('searchAlerts should be returned Observable< ISearchUserAlertsResponse >', () => {
    service.searchAlerts().subscribe((response: ISearchUserAlertsResponse) => {
      expect(response).toBe(SearchUserAlertsMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.alerts.search_v1,
    );
    expect(req.request.method).toBe('POST');
    req.flush(SearchUserAlertsMock);
  });

  it('createAlerts should be returned Observable< ICreateUserAlertResponse >', () => {
    const request: ICreateUserAlertRequest = {
      id: '1',
      idType: '',
      alert: {} as any,
    };
    service
      .createAlerts(request)
      .subscribe((response: ICreateUserAlertResponse) => {
        expect(response).toBe(CreateUserAlertV1Mock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.alerts.create_v1,
    );
    expect(req.request.method).toBe('POST');
    req.flush(CreateUserAlertV1Mock);
  });

  it('allRegisteredFinancialOp should be returned Observable< any >', () => {
    service.allRegisteredFinancialOp().subscribe((response: any) => {
      expect(response).toBe(SearchUserAlertsMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.financial_op.registered,
    );
    expect(req.request.method).toBe('POST');
    req.flush(SearchUserAlertsMock);
  });

  it('allRegisteredPublicServices should be returned Observable< any >', () => {
    service.allRegisteredPublicServices().subscribe((response: any) => {
      expect(response).toBe(SearchUserAlertsMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.bills.allRegistered,
    );
    expect(req.request.method).toBe('POST');
    req.flush(SearchUserAlertsMock);
  });

  it('getInfoUser', () => {
    service.getInfoUser().subscribe((response: any) => {
      expect(response).toBe(SearchUserAlertsMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.infoUser,
    );
    expect(req.request.method).toBe('POST');
    req.flush(SearchUserAlertsMock);
  });
});
