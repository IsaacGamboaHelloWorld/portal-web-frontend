import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { IServicePublicRequest } from '../entities/new-payment';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public publicBillPayment(_data: IServicePublicRequest): Observable<any> {
    const payment = {
      billerPayment: {
        ..._data,
      },
    };

    return this.http.post<any>(
      environment.api.base + environment.api.services.paymentBillPayment,
      payment,
    );
  }
}
