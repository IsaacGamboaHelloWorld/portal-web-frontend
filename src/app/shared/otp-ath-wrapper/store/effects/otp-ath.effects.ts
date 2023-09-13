import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  IOtpAthGenerateResponse,
  IOtpAthGenereateData,
  IOtpAthValidateResponse,
} from '../../entites';
import { OtpAthService } from '../../services/otp-ath.service';
import {
  OtpAthGenerateFail,
  OtpAthGenerateLoad,
  OtpAthGenerateSuccess,
  OtpAthValidateFail,
  OtpAthValidateLoad,
  OtpAthValidateSuccess,
} from '../actions';
import { OtpAthModel } from '../models';

@Injectable()
export class OtpAthEffect {
  constructor(
    private actions$: Actions,
    private otpAthService: OtpAthService,
    private model: OtpAthModel,
  ) {}

  otpAthGenerate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpAthGenerateLoad),
      switchMap((action) =>
        this.otpAthService.Generate(action.transactionType).pipe(
          map((resp: IOtpAthGenerateResponse) => {
            if (resp.success) {
              const data: IOtpAthGenereateData = {
                ...resp.otpData,
                generateOtpAllow: resp.generateOtpAllow,
              };
              return OtpAthGenerateSuccess({ data });
            }
            const { errorMessage } = resp;
            this._notificationError(errorMessage);
            return OtpAthGenerateFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(OtpAthGenerateFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  otpAthValidate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpAthValidateLoad),
      switchMap((action: any) =>
        this.otpAthService.Validate(action).pipe(
          map((resp: IOtpAthValidateResponse) => {
            if (resp.success) {
              return OtpAthValidateSuccess({ data: resp.validateOtpData });
            }
            const { errorMessage } = resp;
            this._notificationError(errorMessage);
            return OtpAthValidateFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(OtpAthValidateFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  private _notificationError(message: string): void {
    this.model.notificationOpen(message, true, ClassNotification.ERROR);
  }
}
