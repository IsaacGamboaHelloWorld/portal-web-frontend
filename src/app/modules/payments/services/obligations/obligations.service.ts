import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

import { LoansList } from '@app/core/interfaces/loansList.interface';
import { BANKS } from '@core/constants/banks';

@Injectable()
export class ObligationsService {
  constructor(private http: HttpClient) {}

  public doGetObligations(): Observable<LoansList> {
    const loanObj = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      language: 'es_CO',
    };

    return this.http.post<LoansList>(
      environment.api.base + environment.api.services.loans,
      loanObj,
    );
  }

  public doPayObligations(data: any): Observable<any> {
    const loanObj = {
      companyId: BANKS.BANCO_POPULAR,
      requestId: Math.floor(Date.now() / 1000),
      language: 'es_CO',
      accountPaymentOrigin: {
        accountId: data.account_destination.accountId,
        accountType: data.account_destination.accountType,
        bank: BANKS.BANCO_POPULAR,
      },
      accountPaymentDestination: {
        accountId: data.obligations_origin.accountId,
        accountType: data.obligations_origin.accountType,
        bank: BANKS.BANCO_POPULAR,
        loanName: data.obligations_origin.accountName,
      },
      transactionValue: {
        amount: data.amount,
        currencyCode: 'COP',
      },
    };
    return this.http.post<LoansList>(
      environment.api.base + environment.api.services.payment,
      loanObj,
    );
  }
}
