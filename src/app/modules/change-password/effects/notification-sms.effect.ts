import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import {
  smsFailActions,
  smsSendActions,
  smsSuccessActions,
} from '@app/store/actions/global/auth/notification-sms.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { NotificationSmsService } from '../services/notification-sms.service';

@Injectable()
export class NotificationSmsEffect {
  constructor(
    private actions$: Actions,
    private notificationSmsService: NotificationSmsService,
  ) {}

  NotificationSms$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(smsSendActions),
      switchMap(() =>
        this.notificationSmsService.sendNotificationSms().pipe(
          map((response: any) => {
            if (!isNullOrUndefined(response) && !response.error) {
              return smsSuccessActions();
            }
            return smsFailActions({ message: response.message });
          }),
          catchError(() => of(smsFailActions({ message: errorMessage500 }))),
        ),
      ),
    ),
  );
}
