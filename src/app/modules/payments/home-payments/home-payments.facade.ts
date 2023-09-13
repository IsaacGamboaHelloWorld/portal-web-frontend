import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HistoricPaymentsLoad } from '@modules/payments/home-payments/store/actions/historic-payments.action';
import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';
import { selectHistoricPayments } from '@modules/payments/home-payments/store/selectors/home-payments.selector';
import { ApplicationState } from '@store/state/application.state';

@Injectable()
export class HomePaymentsFacade {
  constructor(private store: Store<ApplicationState>) {}

  public historicPayments$: Observable<IHistoricPayments> = this.store.pipe(
    select(selectHistoricPayments),
  );

  public fetchHistoric(): void {
    this.store.dispatch(HistoricPaymentsLoad());
  }
}
