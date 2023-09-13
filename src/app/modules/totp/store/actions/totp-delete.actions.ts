import { createAction, props } from '@ngrx/store';
import { IDeleteTotpResponse } from '../../entities/totp-response.interface';

const enum TypeActionsTotpReg {
  LOAD = '[TOTP / API] Delete TOTP Load',
  FAIL = '[TOTP / API] Delete TOTP Fail',
  SUCCESS = '[TOTP / API] Delete TOTP Success',
  RESET = '[TOTP / API] Delete TOTP Reset',
}

export const TotpDeleteLoad = createAction(
  TypeActionsTotpReg.LOAD,
  props<{ totpId: string }>(),
);

export const TotpDeleteSuccess = createAction(
  TypeActionsTotpReg.SUCCESS,
  props<{ data: IDeleteTotpResponse }>(),
);

export const TotpDeleteFail = createAction(
  TypeActionsTotpReg.FAIL,
  props<{ errorMessage: string }>(),
);

export const TotpDeleteReset = createAction(TypeActionsTotpReg.RESET);
