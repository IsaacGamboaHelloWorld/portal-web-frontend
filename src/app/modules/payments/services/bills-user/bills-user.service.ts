import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import {
  CompanyListInterface,
  PaymentBillsRespInterface,
} from '@core/interfaces/paymentBills.interface';
import { environment } from '@environment';
import { IActiveCompanySave } from '../../../../core/interfaces/paymentBills.interface';

@Injectable()
export class BillsUserService {
  constructor(private http: HttpClient) {}

  public allRegisteredBills(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.bills.allRegistered,
      data,
    );
  }

  public billsToPay(): Observable<PaymentBillsRespInterface> {
    const bills = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<PaymentBillsRespInterface>(
      environment.api.base + environment.api.services.paymentBill,
      bills,
    );
  }
  public searchBillCompany(_data: string): Observable<CompanyListInterface> {
    const company = {
      companyId: BANKS.BANCO_POPULAR,
      entityName: _data,
    };

    return this.http.post<CompanyListInterface>(
      environment.api.base +
        environment.api.services.bills.agreementsAvailables,
      company,
    );
  }
  public saveCompany(_data: IActiveCompanySave): Observable<any> {
    const company = {
      companyId: BANKS.BANCO_POPULAR,
      serviceCompanyCode: _data.company_code,
      serviceCompanyName: _data.company_name,
      billId: _data.billId,
      typeServiceCompany: 'NO_BILLER',
    };
    return this.http.post<PaymentBillsRespInterface>(
      environment.api.base + environment.api.services.bills.addAgreement,
      company,
    );
  }
}
