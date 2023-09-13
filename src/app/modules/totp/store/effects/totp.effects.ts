import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  IDeleteTotpResponse,
  IDevicesTotpResponse,
  IGenerateTotpResponse,
  IRegisterTotpResponse,
} from '../../entities/totp-response.interface';
import { ToptService } from '../../services/topt.service';
import {
  TotpDeleteFail,
  TotpDeleteLoad,
  TotpDeleteSuccess,
} from '../actions/totp-delete.actions';
import {
  TotpDevicesFail,
  TotpDevicesLoad,
  TotpDevicesSuccess,
} from '../actions/totp-devices.actions';
import {
  TotpGenerateFail,
  TotpGenerateLoad,
  TotpGenerateSuccess,
} from '../actions/totp-generate.actions';
import {
  TotpRegisterFail,
  TotpRegisterLoad,
  TotpRegisterSuccess,
} from '../actions/totp-register.actions';
import { TotpModel } from '../models/totp.model';

@Injectable()
export class TotpEffect {
  constructor(
    private actions$: Actions,
    private totpService: ToptService,
    private model: TotpModel,
    private translate: TranslateService,
  ) {}

  totpGenerate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TotpGenerateLoad),
      switchMap(() =>
        this.totpService.generate().pipe(
          map((resp: IGenerateTotpResponse) => {
            if (resp.success) {
              return TotpGenerateSuccess({ data: resp });
            }
            const { errorMessage } = resp;
            this.model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return TotpGenerateFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(TotpGenerateFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  totpRegister$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TotpRegisterLoad),
      switchMap((action: any) =>
        this.totpService.register(action.name, action.totpId, action.code).pipe(
          map((resp: IRegisterTotpResponse) => {
            if (resp.success) {
              return TotpRegisterSuccess({ data: resp });
            }
            const { errorMessage } = resp;
            this.model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return TotpRegisterFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(TotpRegisterFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  totpDevices$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TotpDevicesLoad),
      switchMap(() =>
        this.totpService.devices().pipe(
          map((resp: IDevicesTotpResponse) => {
            if (resp.success) {
              return TotpDevicesSuccess({ data: resp });
            }
            const { errorMessage } = resp;
            this.model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return TotpDevicesFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(TotpDevicesFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );
  totpDelete$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TotpDeleteLoad),
      switchMap((action: any) =>
        this.totpService.delete(action.totpId).pipe(
          map((resp: IDeleteTotpResponse) => {
            if (resp.success) {
              const message = this.translate.instant(
                `TOTP_AUTHENTICATION.MODAL_WARNING_DELETE_DEVICE.NOTIFICATION`,
              );
              this.model.notificationOpen(
                message,
                true,
                ClassNotification.SUCCESS,
              );
              return TotpDeleteSuccess({ data: resp });
            }
            const { errorMessage } = resp;
            this.model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return TotpDeleteFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(TotpDeleteFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );
}
