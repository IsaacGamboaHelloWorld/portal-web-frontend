import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { EnabledAgreementsService } from './enabled-agreements.service';

describe('EnabledAgreementsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: EnabledAgreementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [EnabledAgreementsService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(EnabledAgreementsService);
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
    service
      .loadEnabledAgreementsOnScheduledPayment()
      .subscribe((result: any) => {
        expect(result).toBe(mock);
      });

    const req = httpMock.expectOne(
      environment.api.base +
        environment.api.services.bills.availableAgreementsForPaymentSchedule,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
