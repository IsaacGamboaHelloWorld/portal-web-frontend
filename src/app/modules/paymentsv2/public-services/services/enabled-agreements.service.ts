import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { EnabledAgreementsResponse } from '../entities/enabled-agreements';

@Injectable()
export class EnabledAgreementsService {
  constructor(private http: HttpClient) {}

  public loadEnabledAgreementsOnScheduledPayment(): Observable<
    EnabledAgreementsResponse
  > {
    return this.http.post<EnabledAgreementsResponse>(
      environment.api.base +
        environment.api.services.bills.availableAgreementsForPaymentSchedule,
      {},
    );
  }
}
