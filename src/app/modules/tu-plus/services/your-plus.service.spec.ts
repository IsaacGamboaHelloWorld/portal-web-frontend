import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { environment } from '@environment';
import {
  yourPlusCloseSessionMock,
  yourPlusConfigurationMock,
  yourPlusHistoryMovementsMock,
  yourPlusOTPGenerationMock,
  yourPlusRedemptionMock,
} from '@root/test-helpers/mocks/data/your-plus.mock';
import { ApplicationModelMock } from '@root/test-helpers/mocks/models/application.model.mock';
import { IResConfiguration } from '../entities/configuration.interface';
import { IResHistoricMovements } from '../entities/historic-movements.interface';
import { IResOTPGeneration } from '../entities/otp-generation.interface';
import { IResRedemption } from '../entities/redemption.interface';

import { YourPlusService } from './your-plus.service';

describe('YourPlusService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: YourPlusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        YourPlusService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(YourPlusService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    injector = null;
    httpMock = null;
    service = null;
  });

  it('should create YourPlusService', () => {
    expect(service).toBeTruthy();
  });

  it('HistoricMovementsService test', () => {
    service
      .HistoricMovementsService(
        '2022-01-22T00:00:00',
        '2022-02-21T00:00:00',
        false,
        0,
      )
      .subscribe((data: IResHistoricMovements) => {
        expect(data).toBe(yourPlusHistoryMovementsMock);
      });
    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.historicMovements,
    );
    expect(req.request.method).toBe('POST');
    req.flush(yourPlusHistoryMovementsMock);
  });

  it('ConfigurationService test', () => {
    service
      .ConfigurationService('cuenta')
      .subscribe((data: IResConfiguration) => {
        expect(data).toBe(yourPlusConfigurationMock);
      });
    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.configuration,
    );
    expect(req.request.method).toBe('POST');
    req.flush(yourPlusConfigurationMock);
  });
  it('RedemptionService test', () => {
    service
      .RedemptionService(
        '2000',
        '24000',
        '230013001730',
        'DEPOSIT_ACCOUNT',
        '00010029',
        'POPULAR',
        '23326984',
        '372e217b-a191-4e89-9e74-27b098977af7',
      )
      .subscribe((data: IResRedemption) => {
        expect(data).toBe(yourPlusRedemptionMock);
      });
    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.redemption,
    );
    expect(req.request.method).toBe('POST');
    req.flush(yourPlusRedemptionMock);
  });
  it('OTPGenerationService test', () => {
    service.OTPGenerationService().subscribe((data: IResOTPGeneration) => {
      expect(data).toBe(yourPlusOTPGenerationMock);
    });
    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.otpGeneration,
    );
    expect(req.request.method).toBe('POST');
    req.flush(yourPlusOTPGenerationMock);
  });
  it('CloseSessionTuPlus test', () => {
    service.CloseSessionTuPlus().subscribe((data: any) => {
      expect(data).toBe(yourPlusCloseSessionMock);
    });
    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.tuPlus.closeToPlus,
    );
    expect(req.request.method).toBe('POST');
    req.flush(yourPlusCloseSessionMock);
  });
});
