import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../../../core/interfaces/paymentBills.interface';

@Injectable()
export class RecurringPaymentService {
  constructor(private http: HttpClient) {}

  public saveRecurring(
    data: IRecurringPayment,
  ): Observable<IRecurringPaymentResponse> {
    const creatingData = {
      biller: data,
    };
    return this.http.post<IRecurringPaymentResponse>(
      environment.api.base + environment.api.services.recurring.create,
      creatingData,
    );
  }
}
