import { Injectable } from '@angular/core';
import { ClassNotification } from '@app/core/constants/notification';
import {
  ChangePasswordAction,
  ChangePasswordFailAction,
  ChangePasswordSuccessAction,
} from '@app/store/actions/global/auth/change-password.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ChangePasswordModel } from '../change-password.model';
import { ChangePasswordService } from '../services/change-password.service';

@Injectable()
export class ChangePasswordEffect {
  constructor(
    private actions$: Actions,
    private destinationService: ChangePasswordService,
    private model: ChangePasswordModel,
  ) {}

  @Effect()
  ChangePassword: Observable<Action> = this.actions$.pipe(
    ofType(ChangePasswordAction),
    switchMap((action) => {
      return this.destinationService.execute(action.content).pipe(
        map((response: any) => {
          if (!isNullOrUndefined(response)) {
            this.model.sendNotificationSms();
            this.model.notificationOpen(
              response['description'],
              true,
              ClassNotification.SUCCESS,
            );
            return ChangePasswordSuccessAction();
          }
        }),
        catchError((err) => {
          this.model.notificationOpen(
            !isNullOrUndefined(err['description']) ? err['description'] : err,
            false,
            ClassNotification.ERROR,
          );
          return of(ChangePasswordFailAction());
        }),
      );
    }),
  );
}
