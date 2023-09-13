import { createAction, props } from '@ngrx/store';
import { IRegisterTotpResponse } from '../../entities/totp-response.interface';

const enum TypeActionsTotpReg {
  LOAD = '[TOTP / API] Register TOTP Load',
  FAIL = '[TOTP / API] Register TOTP Fail',
  SUCCESS = '[TOTP / API] Register TOTP Success',
  RESET = '[TOTP / API] Register TOTP Reset',
}

export const TotpRegisterLoad = createAction(
  TypeActionsTotpReg.LOAD,
  props<{ name: string; totpId: string; code: string }>(),
);

export const TotpRegisterSuccess = createAction(
  TypeActionsTotpReg.SUCCESS,
  props<{ data: IRegisterTotpResponse }>(),
);

export const TotpRegisterFail = createAction(
  TypeActionsTotpReg.FAIL,
  props<{ errorMessage: string }>(),
);

export const TotpRegisterReset = createAction(TypeActionsTotpReg.RESET);
