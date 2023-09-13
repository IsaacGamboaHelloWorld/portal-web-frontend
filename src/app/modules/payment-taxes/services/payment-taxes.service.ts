import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  IAnswerPaymentTaxes,
  ICities,
  IReference,
  ISendPaymentTaxes,
  ITaxes,
} from '../entities/payment-taxes';

@Injectable()
export class PaymentTaxesService {
  constructor(private http: HttpClient) {}

  public paymentTaxesCities(): Observable<ICities> {
    const payload = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<ICities>(
      environment.api.base + environment.api.services.paymentTaxes.cities,
      payload,
    );
  }

  public loadTaxes(idCity?: string): Observable<ITaxes> {
    const payload = {
      cityId: idCity,
    };

    return this.http.post<ITaxes>(
      environment.api.base + environment.api.services.paymentTaxes.taxes,
      payload,
    );
  }

  public validReference(
    noReference?: number,
    idBiller?: string,
  ): Observable<IReference> {
    const payload = {
      companyId: BANKS.BANCO_POPULAR,
      billerId: idBiller,
      invoiceNumber: String(noReference),
    };

    return this.http.post<IReference>(
      environment.api.base + environment.api.services.paymentTaxes.amount,
      payload,
    );
  }

  public payment(data?: ISendPaymentTaxes): Observable<IAnswerPaymentTaxes> {
    const payload = data;
    payload.currencyCode = 'COP';
    payload.references = ['test'];

    return this.http.post<IAnswerPaymentTaxes>(
      environment.api.base + environment.api.services.paymentTaxes.payment,
      payload,
    );
  }
}
