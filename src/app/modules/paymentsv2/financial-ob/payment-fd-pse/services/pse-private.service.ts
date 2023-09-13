import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PSE_RETURN_PB } from '@app/core/constants/auth';
import { SecurityService } from '@app/modules/security/services/security.service';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { BanksPseResponse } from '../entities/banks-pse.interface';
import {
  IPaymentPseRequest,
  IPaymentPseResponse,
} from '../entities/payment-transaction-pse.interface';
import {
  IPaymentPseStatusRequest,
  IPaymentPseStatusResponse,
} from '../entities/status-pse.interface';

@Injectable()
export class PsePrivateService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2436498062/Get+PSE+Registered+bank+list+New+Version
  banksPse(): Observable<BanksPseResponse> {
    const body = {};
    return this.http.post<BanksPseResponse>(
      environment.api.base + environment.api.services.psePrivate.banks,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2434598526/Init+PSE+Payment+Transaction+New+Version
  initPse(body: IPaymentPseRequest): Observable<IPaymentPseResponse> {
    return this.http.post<IPaymentPseResponse>(
      environment.api.base + environment.api.services.psePrivate.init,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2435024278/Get+PSE+Payment+Transaction+Status+New+Version
  getStatusPse(paymentId: string): Observable<IPaymentPseStatusResponse> {
    const body: IPaymentPseStatusRequest = {
      paymentId,
    };
    return this.http.post<IPaymentPseStatusResponse>(
      environment.api.base + environment.api.services.psePrivate.status,
      body,
    );
  }

  public setPaymentId(paymentId: string): void {
    localStorage.setItem(PSE_RETURN_PB, paymentId);
  }

  public getPaymentId(): string {
    return localStorage.getItem(PSE_RETURN_PB);
  }

  public removePaymentId(): void {
    localStorage.removeItem(PSE_RETURN_PB);
  }
}
