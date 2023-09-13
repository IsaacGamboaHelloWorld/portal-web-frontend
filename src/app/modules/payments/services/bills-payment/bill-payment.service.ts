import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { PaymentBillResponseInterface } from '../../../../core/interfaces/paymentBills.interface';

@Injectable()
export class PaymentBillService {
  constructor(private http: HttpClient) {}

  public publicBillPayment(
    originAccountId: string,
    originAccountType: string,
    amount: string,
    biller: boolean,
    billerId: string,
    billerName: string,
    billerNickName: string,
    contract: string,
    invoice: string,
    dueDate: string,
    scheduledDate: string,
    expirationDate: string,
    isScheduledPayment: boolean,
    isDonePayment: boolean,
    primaryBillerAmount: string,
    primaryBillerCurrencyCode: string,
    reference: string,
    secondaryBillerAmount: string,
    secondaryBillerCurrencyCode: string,
  ): Observable<PaymentBillResponseInterface> {
    const payment = {
      companyId: BANKS.BANCO_POPULAR,
      ipAddress: '192.168.0.1',
      requestId: Math.floor(Date.now() / 1000),
      language: 'es_CO',
      billerPayment: {
        originAccountId,
        originAccountType: originAccountType.toUpperCase(),
        amount,
        currencyCode: 'COP',
        biller,
        billerId,
        billerName,
        billerNickName,
        contract,
        invoice,
        dueDate,
        scheduledDate,
        expirationDate,
        isScheduledPayment,
        isDonePayment,
        primaryBillerAmount,
        primaryBillerCurrencyCode,
        reference,
        secondaryBillerAmount,
        secondaryBillerCurrencyCode,
      },
    };

    return this.http.post<PaymentBillResponseInterface>(
      environment.api.base + environment.api.services.paymentBillPayment,
      payment,
    );
  }
}
