import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AlertsService } from '../../services/alerts.service';

import * as AllCreateAlert from '@modules/alerts/store/actions/user.action';

import { IUserAlertResponse } from '../../entities/user';

@Injectable()
export class UserAlertsEffect {
  constructor(private actions$: Actions, private _service: AlertsService) {}

  UserAlert: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllCreateAlert.UserAlertsLoadAction),
      switchMap((action) => {
        return this._service.userAlert(action.request).pipe(
          take(1),
          map((data: IUserAlertResponse) => {
            if (!!data.success && data.success) {
              return AllCreateAlert.UserAlertsSuccessAction(data);
            }
            return AllCreateAlert.UserAlertsFailAction(data.errorMessage);
          }),
          catchError((error) => {
            return of(AllCreateAlert.UserAlertsFailAction(error.errorMessage));
          }),
        );
      }),
    ),
  );
}
