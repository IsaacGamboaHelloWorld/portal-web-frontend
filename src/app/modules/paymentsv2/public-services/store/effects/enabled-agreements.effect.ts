import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { EnabledAgreementsService } from '../../services/enabled-agreements.service';
import * as EnabledAgreementsActions from '../actions/enabled-agreements-on-scheduled-payment.action';

@Injectable()
export class EnabledAgreementsEffect {
  constructor(
    private actions$: Actions,
    private _service: EnabledAgreementsService,
  ) {}

  LoadEnabledAgreements: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EnabledAgreementsActions.EnabledAgreementsLoad),
      switchMap((action) => {
        return this._service.loadEnabledAgreementsOnScheduledPayment().pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return EnabledAgreementsActions.EnabledAgreementsSuccess(data);
            }
            return EnabledAgreementsActions.EnabledAgreementsFails(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            return of(
              EnabledAgreementsActions.EnabledAgreementsFails(
                error.errorMessage,
              ),
            );
          }),
        );
      }),
    ),
  );
}
