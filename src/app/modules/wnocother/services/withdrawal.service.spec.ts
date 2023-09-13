import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '@environment';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { WnocotherService } from './withdrawal.service';

describe('WithdrawalService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: WnocotherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [WnocotherService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(WnocotherService);
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

  it('getOTPWitdrawal', () => {
    const resp = {};
    const request = {
      where: '',
      ammount: '',
      from: {
        id: '',
        accountId: '',
        accountType: '',
      },
      document: '',
    };
    service.getOTPWitdrawal(request).subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.otpService,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });
});
