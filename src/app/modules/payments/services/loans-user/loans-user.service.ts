import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoanDestinationRespInterface } from '@app/core/interfaces/loan-destination.interface';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';

@Injectable()
export class LoansUserService {
  constructor(private http: HttpClient) {}

  public loansToPay(): Observable<LoanDestinationRespInterface> {
    const loans = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      language: 'es_CO',
    };

    return this.http.post<LoanDestinationRespInterface>(
      environment.api.base + environment.api.services.loans,
      loans,
    );
  }
}
