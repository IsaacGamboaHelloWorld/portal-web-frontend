import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { IBillerDetailResponse } from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  IAnswerInformation,
  IAnswerPayRoll,
  IAnswerPayStack,
  ISendInformation,
  PilaPaymentRequest,
} from '../entities/pay-stack';

@Injectable({
  providedIn: 'root',
})
export class PayStackService {
  public organizationIdType: string = '335';
  public chanel: string = 'Another';
  constructor(private http: HttpClient) {}

  public agreements(id: string): Observable<IAnswerPayRoll> {
    const payload = {
      requestId: id,
      companyId: BANKS.BANCO_POPULAR,
      organizationIdType: this.organizationIdType,
      channel: this.chanel,
    };
    return this.http.post<IAnswerPayRoll>(
      environment.api.base +
        environment.api.services.bills.agreementsAvailables,
      payload,
    );
  }
  public information(info: ISendInformation): Observable<IAnswerInformation> {
    const payload = info;

    return this.http.post<IAnswerInformation>(
      environment.api.base + environment.api.services.pay_stack_information,
      payload,
    );
  }
  public payment(pay: PilaPaymentRequest): Observable<IAnswerPayStack> {
    const payload = pay;

    return this.http.post<IAnswerPayStack>(
      environment.api.base + environment.api.services.pilaPayment,
      payload,
    );
  }

  public getBillDetail(data: any): Observable<IBillerDetailResponse> {
    const loanDetail = {
      language: 'es_CO',
      billerPayment: data,
    };
    return this.http.post<IBillerDetailResponse>(
      environment.api.base + environment.api.services.paymentBillDetail,
      loanDetail,
    );
  }
}
