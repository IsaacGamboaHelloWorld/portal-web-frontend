import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { CellPhoneRechargeService } from './cell-phone-recharge.service';

describe('CellPhoneRechargeService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: CellPhoneRechargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CellPhoneRechargeService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(CellPhoneRechargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('recharge', () => {
    const resp = {};
    const request = {
      account_origin: {
        id: '',
        typeAccount: '',
      },
      phone_number: '',
      amount: '',
      operator: {
        code: '',
        name: '',
      },
    } as any;
    service.recharge(request).subscribe((response: any) => {
      expect(response).toBe(resp);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.cellPhoneRecharge,
    );
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });
});
