import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import {
  IFinancialObRequest,
  IFinancialObResponse,
} from '../entities/new-payment';

@Injectable()
export class PaymentFOService {
  constructor(private http: HttpClient) {}

  public publicBillPayment(
    _data: IFinancialObRequest,
  ): Observable<IFinancialObResponse> {
    const payment = {
      billerPayment: {
        ..._data,
      },
    };

    return this.http.post<IFinancialObResponse>(
      environment.api.base + environment.api.services.paymentBillPayment,
      payment,
    );
  }
}
