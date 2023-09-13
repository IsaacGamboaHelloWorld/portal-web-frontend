import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { IRespondHistoricPayments } from '@app/modules/payments/home-payments/entities/historic-payments';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  IBank,
  IDeleteLoanRequest,
  IDeleteLoanResponse,
  INextFOPaymentsResponse,
} from '../entities/financial-op';

@Injectable()
export class FinancialOpService {
  constructor(private http: HttpClient) {}

  public loadNextFinancialOpPayments(): Observable<INextFOPaymentsResponse> {
    const bills = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<INextFOPaymentsResponse>(
      environment.api.base + environment.api.services.paymentBill,
      bills,
    );
  }

  public allRegisteredFinancialOp(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.financial_op.registered,
      data,
    );
  }

  public banks(): Observable<IBank> {
    return this.http.get<IBank>(
      environment.api.base + environment.api.services.banks,
    );
  }

  public banksLoans(bank: string): Observable<IBank> {
    const payload = {
      bank,
    };

    return this.http.post<IBank>(
      environment.api.base + environment.api.services.paymentbankLoans,
      payload,
    );
  }

  public doDelete(_data: IDeleteLoanRequest): Observable<IDeleteLoanResponse> {
    const data = {
      loan: {
        accountId: _data.accountId,
        accountType: _data.accountType,
        bank: _data.bank,
      },
    };

    return this.http.post<IDeleteLoanResponse>(
      environment.api.base + environment.api.services.financial_op.delete,
      data,
    );
  }

  public getHistoryPayments(): Observable<IRespondHistoricPayments> {
    return this.http.post<IRespondHistoricPayments>(
      environment.api.base + environment.api.services.historicPayments,
      {
        companyId: BANKS.BANCO_POPULAR,
      },
    );
  }
}
