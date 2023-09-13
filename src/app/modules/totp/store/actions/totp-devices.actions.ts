import { createAction, props } from '@ngrx/store';
import { IDevicesTotpResponse } from '../../entities/totp-response.interface';

const enum TypeActionsTotpDev {
  LOAD = '[TOTP / API] Devices TOTP Load',
  FAIL = '[TOTP / API] Devices TOTP Fail',
  SUCCESS = '[TOTP / API] Devices TOTP Success',
  RESET = '[TOTP / API] Devices TOTP Reset',
}

export const TotpDevicesLoad = createAction(TypeActionsTotpDev.LOAD);

export const TotpDevicesSuccess = createAction(
  TypeActionsTotpDev.SUCCESS,
  props<{ data: IDevicesTotpResponse }>(),
);

export const TotpDevicesFail = createAction(
  TypeActionsTotpDev.FAIL,
  props<{ errorMessage: string }>(),
);

export const TotpDevicesReset = createAction(TypeActionsTotpDev.RESET);
