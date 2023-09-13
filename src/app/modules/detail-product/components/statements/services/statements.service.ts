import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';

@Injectable()
export class StatementsService {
  constructor(private http: HttpClient) {}

  public getPeriods(account: string, type: string): Observable<IStatementDs> {
    const user = {
      accountId: account,
      accountType: type.toUpperCase(),
      companyId: BANKS.BANCO_POPULAR,
      requestId: Math.floor(Date.now() / 1000),
    };

    return this.http.post<IStatementDs>(
      environment.api.base + environment.api.services.statements,
      user,
    );
  }

  public getPdf(
    account: string,
    type: string,
    data: IPeriodItem,
  ): Observable<IPdfdata> {
    const user = {
      accountId: account,
      accountType: type,
      companyId: BANKS.BANCO_POPULAR,
      requestId: Math.floor(Date.now() / 1000),
      fileDesc: data.periodName,
      endDt: data.endDate,
      startDt: data.startDate,
    };

    return this.http.post<IPdfdata>(
      environment.api.base + environment.api.services.pdf,
      user,
    );
  }
}
