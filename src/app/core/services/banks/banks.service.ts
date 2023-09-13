import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBankLoan } from '@app/core/interfaces/bankLoan.interface';
import { IBank } from '@core/interfaces/banks.interface';
import { environment } from '@environment';

@Injectable()
export class BanksService {
  constructor(private http: HttpClient) {}

  public banks(): Observable<IBank> {
    return this.http.get<IBank>(
      environment.api.base + environment.api.services.banks,
    );
  }

  public loansAvailablebanks(): Observable<IBank> {
    return this.http.get<IBank>(
      environment.api.base + environment.api.services.paymentAvailableBanks,
    );
  }

  public bankLoans(bank: string): Observable<IBankLoan> {
    const payload = {
      bank,
    };

    return this.http.post<IBankLoan>(
      environment.api.base + environment.api.services.paymentbankLoans,
      payload,
    );
  }
}
