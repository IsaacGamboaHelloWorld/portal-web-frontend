import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { AccountTransferInterface } from '@core/interfaces/accountTransfer.interface';
import { environment } from '@environment';
import { TransferOneForm } from '../../../../../../test-helpers/mocks/data/step-one-transfer.mock';
import { TransferMock } from '../../../../../../test-helpers/mocks/data/transfer-account.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { OldTransferService } from './old-transfer.service';

describe('OldOldTransferService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [OldTransferService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: OldTransferService = TestBed.get(OldTransferService);
    expect(service).toBeTruthy();
  });

  it('should be returned Observable< AccountTransferInterface >', () => {
    const service: OldTransferService = TestBed.get(OldTransferService);
    service
      .accountTransfer(TransferOneForm, 1000, '', 'sfsdg', '', true, false)
      .subscribe((data: AccountTransferInterface) =>
        expect(data.success).toBeTruthy(),
      );

    const req = httpMock.expectOne(
      environment.api.base +
        environment.api.services.transfers.account_transfer,
    );
    expect(req.request.method).toBe('POST');
    req.flush(TransferMock);
  });

  it('should be returned Observable< AccountTransferInterface > data empty', () => {
    const service: OldTransferService = TestBed.get(OldTransferService);
    service
      .accountTransfer(TransferOneForm, 1000, '', 'sfsdg', 'test')
      .subscribe((data: AccountTransferInterface) =>
        expect(data.request['transactionInformation']['amount']).toEqual(1000),
      );

    const req = httpMock.expectOne(
      environment.api.base +
        environment.api.services.transfers.account_transfer,
    );
    expect(req.request.method).toBe('POST');
    req.flush(TransferMock);
  });
});
