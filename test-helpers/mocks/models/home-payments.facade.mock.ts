import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';

@Injectable()
export class HomePaymentsFacadeMock {
  public historicPayments$: BehaviorSubject<
    IHistoricPayments
  > = new BehaviorSubject({
    data: null,
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
  });

  public fetchHistoric(): void {}
}
