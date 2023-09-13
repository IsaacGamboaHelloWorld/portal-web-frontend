import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { IRespondHistoricPayments } from '@modules/payments/home-payments/entities/historic-payments';
import { HistoricPaymentsService } from '@modules/payments/home-payments/services/historic-payments.service';
import * as HistoricActions from '@modules/payments/home-payments/store/actions/historic-payments.action';

@Injectable()
export class HistoricPaymentsEffect {
  constructor(
    private actions$: Actions,
    private historicService: HistoricPaymentsService,
  ) {}

  HistoricPayments: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoricActions.HistoricPaymentsLoad),
      switchMap((action) => {
        return this.historicService.historicPayments().pipe(
          take(1),
          map((data: IRespondHistoricPayments) => {
            if (!!data.success && data.success) {
              return HistoricActions.HistoricPaymentsSuccess(data.records);
            }
            return HistoricActions.HistoricPaymentsFail(data.errorMessage);
          }),
          catchError((error) => of(HistoricActions.HistoricPaymentsFail(''))),
        );
      }),
    ),
  );
}
