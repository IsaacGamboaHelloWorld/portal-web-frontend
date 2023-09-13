import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { IRespondHistoricPayments } from '@app/modules/payments/home-payments/entities/historic-payments';
import { FinancialOpService } from '../../services/financial-op.service';
import * as PaymentHistoryActions from '../actions/payment-history.actions';

@Injectable()
export class PaymentHistoryEffect {
  constructor(
    private actions$: Actions,
    private _service: FinancialOpService,
  ) {}

  HistoricPayments: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentHistoryActions.PaymentHistoryLoad),
      switchMap((action) => {
        return this._service.getHistoryPayments().pipe(
          take(1),
          map((data: IRespondHistoricPayments) => {
            if (data.success) {
              return PaymentHistoryActions.PaymentHistorySuccess(data.records);
            }
            return PaymentHistoryActions.PaymentHistoryFail(data.errorMessage);
          }),
          catchError((error) =>
            of(PaymentHistoryActions.PaymentHistoryFail('')),
          ),
        );
      }),
    ),
  );
}
