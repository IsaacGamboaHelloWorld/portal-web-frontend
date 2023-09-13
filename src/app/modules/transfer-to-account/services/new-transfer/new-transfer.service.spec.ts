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
import { NewTransferService } from './new-transfer.service';

xdescribe('NewTransferService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [NewTransferService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: NewTransferService = TestBed.get(NewTransferService);
    expect(service).toBeTruthy();
  });
});
