import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  IDeleteServiceRequest,
  INextPaymentsResponse,
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../entities/public-services';
import { IBillerDetailResponse } from '../payment/entities/new-payment';

@Injectable()
export class PublicServicesService {
  constructor(private http: HttpClient) {}

  public loadNextPublicServicesPayments(): Observable<INextPaymentsResponse> {
    const bills = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<INextPaymentsResponse>(
      environment.api.base + environment.api.services.paymentBill,
      bills,
    );
  }

  public allRegisteredPublicServices(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.bills.allRegistered,
      data,
    );
  }

  public doDelete(
    _data: IDeleteServiceRequest,
  ): Observable<IDeleteServiceRequest> {
    return this.http.post<IDeleteServiceRequest>(
      environment.api.base + environment.api.services.bills.delete,
      _data,
    );
  }

  public saveRecurring(
    data: IRecurringPayment,
  ): Observable<IRecurringPaymentResponse> {
    const creatingData = {
      biller: data,
    };

    if (!data.editMode) {
      return this.http.post<IRecurringPaymentResponse>(
        environment.api.base + environment.api.services.recurring.create,
        creatingData,
      );
    } else {
      return this.http.post<IRecurringPaymentResponse>(
        environment.api.base + environment.api.services.recurring.update,
        creatingData,
      );
    }
  }

  public deleteRecurring(
    data: IRecurringPayment,
  ): Observable<IRecurringPaymentResponse> {
    const creatingData = {
      biller: data,
    };
    return this.http.post<IRecurringPaymentResponse>(
      environment.api.base + environment.api.services.recurring.delete,
      creatingData,
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
