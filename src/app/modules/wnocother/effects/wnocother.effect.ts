import { Injectable } from '@angular/core';
import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { WnocotherService } from '@app/modules/wnocother/services/withdrawal.service';
import { WnocotherMoldel } from '@app/modules/wnocother/wnocother.model';
import * as withDrawalActions from '@app/store/actions/models/withdrawal/no-card/no-card.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ClassNotification } from '../../../core/constants/notification';

@Injectable()
export class WnocotherEffect {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private withdrawalService: WnocotherService,
    private model: WnocotherMoldel,
  ) {}

  @Effect()
  LoadWitdrawal: Observable<Action> = this.actions$.pipe(
    ofType<withDrawalActions.LoadWithDrawalAction>(
      withDrawalActions.LOAD_WITHDRAWAL,
    ),
    switchMap((action: withDrawalActions.LoadWithDrawalAction) => {
      const data = {
        typeTransaction: action.typeTransaction,
        from: action.from,
        where: action.where,
        ammount: action.ammount,
        document: action.document,
      };
      return this.withdrawalService.getOTPWitdrawal(data).pipe(
        takeUntil(this.globalData.cancel),
        map((otpResponse: OtpWithDrawal) => {
          if (!isNullOrUndefined(otpResponse) && otpResponse.success) {
            return new withDrawalActions.SuccessWithDrawalAction(otpResponse);
          } else {
            this.model.notificationOpen(
              otpResponse.errorMessage,
              false,
              ClassNotification.ERROR,
            );
            return new withDrawalActions.FailWithDrawalAction(
              otpResponse.errorMessage,
            );
          }
        }),
        catchError((err) => {
          const message = isNullOrUndefined(err)
            ? ''
            : typeof err === 'string'
            ? err
            : err.errorMessage;
          this.model.notificationOpen(message, false, ClassNotification.ERROR);
          return of(new withDrawalActions.FailWithDrawalAction(err));
        }),
      );
    }),
  );
}
