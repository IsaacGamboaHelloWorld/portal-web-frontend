import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { IRespondHistoricPayments } from '@modules/payments/home-payments/entities/historic-payments';
import { ChooseHistoryService } from '@modules/paymentsv2/choose-history/services/choose-history.service';
import * as ChooseHistoryActions from '@modules/paymentsv2/choose-history/store/actions/choose-history.actions';

@Injectable()
export class ChooseHistoryEffect {
  constructor(
    private actions$: Actions,
    private _service: ChooseHistoryService,
  ) {}

  ChooseHistoricPayments: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ChooseHistoryActions.ChooseHistoryLoad),
      switchMap((action) => {
        return this._service.chooseHistoryPayments().pipe(
          take(1),
          map((data: IRespondHistoricPayments) => {
            if (!!data.success && data.success) {
              return ChooseHistoryActions.ChooseHistorySuccess(data.records);
            }
            return ChooseHistoryActions.ChooseHistoryFail(data.errorMessage);
          }),
          catchError((error) => of(ChooseHistoryActions.ChooseHistoryFail(''))),
        );
      }),
    ),
  );
}
