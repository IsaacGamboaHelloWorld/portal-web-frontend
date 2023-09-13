import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { IRespondHistoricPayments } from '@modules/payments/home-payments/entities/historic-payments';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HistoricPaymentsService {
  constructor(private http: HttpClient) {}

  public historicPayments(): Observable<IRespondHistoricPayments> {
    return this.http.post<IRespondHistoricPayments>(
      environment.api.base + environment.api.services.historicPayments,
      {
        companyId: BANKS.BANCO_POPULAR,
      },
    );
  }
}
