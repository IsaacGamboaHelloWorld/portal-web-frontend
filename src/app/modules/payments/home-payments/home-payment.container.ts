import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INavigate, Navigate } from '@core/constants/navigate';
import { HomePaymentsFacade } from '@modules/payments/home-payments/home-payments.facade';
import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home-payment',
  templateUrl: './home-payment.container.html',
  styleUrls: ['./home-payment.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePaymentContainer implements OnInit {
  constructor(private facade: HomePaymentsFacade) {}

  ngOnInit(): void {
    this.fetchHistoric();
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get historicPayments$(): Observable<IHistoricPayments> {
    return this.facade.historicPayments$;
  }

  get hasHistoric$(): Observable<boolean> {
    return this.historicPayments$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.data) &&
          info.data.length > 0,
      ),
    );
  }

  public fetchHistoric(): void {
    this.facade.fetchHistoric();
  }
}
