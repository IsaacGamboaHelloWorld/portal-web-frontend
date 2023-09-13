import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ERROR_MESSAGE } from '../../constants/constants';
import { IResRedemption } from '../../entities/redemption.interface';
import { YourPlusService } from '../../services/your-plus.service';
import {
  RedemptionActionFail,
  RedemptionActionLoad,
  RedemptionActionSuccess,
} from '../actions/redemption.actions';
import { YourPlusModel } from '../models/your-plus.model';

@Injectable()
export class RedemptionEffect {
  constructor(
    private _actions$: Actions,
    private _service: YourPlusService,
    private _model: YourPlusModel,
    private _translate: TranslateService,
  ) {}
  RedemptionEffect: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(RedemptionActionLoad),
      switchMap((action: any) => {
        return this._service
          .RedemptionService(
            action.totalPoints,
            action.curAmt,
            action.accountId,
            action.accountType,
            action.bankId,
            action.bankName,
            action.otpValue,
            action.spRefId,
          )
          .pipe(
            take(1),
            map((data: IResRedemption) => {
              if (!!data && data.success) {
                return RedemptionActionSuccess({
                  data,
                });
              }
              this._model.notificationOpen(
                this._translate.instant(data.errorMessage),
                true,
                data.errorMessageCode ===
                  ERROR_MESSAGE.REDEMPTION_SHOW_LAST_MOVEMENTS
                  ? ClassNotification.INFO
                  : ClassNotification.ERROR,
                true,
              );
              return RedemptionActionFail({
                errorMessage: this._translate.instant(data.errorMessage),
                specificErrorMessage: this._translate.instant(
                  data.specificErrorMessage
                    ? data.specificErrorMessage
                    : errorMessage500,
                ),
                errorMessageCode: data.errorMessageCode
                  ? data.errorMessageCode
                  : ERROR_MESSAGE.DEFAULT_ERROR_CODE,
              });
            }),
            catchError((_error: any) => {
              return of(
                RedemptionActionFail({
                  errorMessage: errorMessage500,
                  specificErrorMessage: errorMessage500,
                  errorMessageCode: ERROR_MESSAGE.DEFAULT_ERROR_CODE,
                }),
              );
            }),
          );
      }),
    ),
  );
}
