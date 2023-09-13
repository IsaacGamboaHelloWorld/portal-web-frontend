import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IOrderPaymentAll, IPayrollLoans } from '../entities/order-of-payment';

@Injectable({
  providedIn: 'root',
})
export class OrderOfPaymentService {
  constructor(private http: HttpClient) {}

  public orderOfPayment(): Observable<IOrderPaymentAll> {
    return this.http.post<IOrderPaymentAll>(
      environment.api.base + environment.api.services.order_of_payment,
      {},
    );
  }

  public addItems(items: IPayrollLoans[]): void {
    items.forEach((e) => {
      e.company.sliceName = String(e.company.name).split('-')[0];
      e.percentaje = Math.round(
        (e.disbursementAmount / e.approvedAmount) * 100,
      );
      e.total = Math.round((e.approvedAmount / e.approvedAmount) * 100);
      e.statusDetail = String(e.status)
        .split('-')[1]
        .trim();
    });
  }
}
