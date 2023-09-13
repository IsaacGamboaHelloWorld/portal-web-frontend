import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import { TempProduct } from '@app/store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';
import { Action } from '@ngrx/store';

export const LOAD_WITHDRAWAL = '[Withdrawal] Load withdrawal';
export const SUCCESS_WITHDRAWAL = '[Withdrawal] Success withdrawal';
export const FAIL_WITHDRAWAL = '[Withdrawal] Fail withdrawal';
export const RESET_WITHDRAWAL = '[Withdrawal] Reset withdrawal';

export class LoadWithDrawalAction implements Action {
  readonly type: string = LOAD_WITHDRAWAL;
  constructor(
    public typeTransaction: string,
    public from: TempProduct,
    public where: string,
    public ammount: number,
    public document: string,
  ) {}
}

export class SuccessWithDrawalAction implements Action {
  readonly type: string = SUCCESS_WITHDRAWAL;
  constructor(public data: OtpWithDrawal) {}
}

export class FailWithDrawalAction implements Action {
  readonly type: string = FAIL_WITHDRAWAL;
  constructor(public error: string) {}
}

export class ResetWithDrawalAction implements Action {
  readonly type: string = RESET_WITHDRAWAL;
}

export type actions =
  | LoadWithDrawalAction
  | SuccessWithDrawalAction
  | FailWithDrawalAction
  | ResetWithDrawalAction;
