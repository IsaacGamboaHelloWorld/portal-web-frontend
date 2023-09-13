import { createAction, props } from '@ngrx/store';
import { IGenerateTotpResponse } from '../../entities/totp-response.interface';

const enum TypeActionsTotpGen {
  LOAD = '[TOTP / API] Generate TOTP Load',
  FAIL = '[TOTP / API] Generate TOTP Fail',
  SUCCESS = '[TOTP / API] Generate TOTP Success',
  RESET = '[TOTP / API] Generate TOTP Reset',
}

export const TotpGenerateLoad = createAction(TypeActionsTotpGen.LOAD);

export const TotpGenerateSuccess = createAction(
  TypeActionsTotpGen.SUCCESS,
  props<{ data: IGenerateTotpResponse }>(),
);

export const TotpGenerateFail = createAction(
  TypeActionsTotpGen.FAIL,
  props<{ errorMessage: string }>(),
);

export const TotpGenerateReset = createAction(TypeActionsTotpGen.RESET);
