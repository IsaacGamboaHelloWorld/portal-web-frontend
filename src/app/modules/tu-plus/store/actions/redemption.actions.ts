import { createAction, props } from '@ngrx/store';
import { IResRedemption } from '../../entities/redemption.interface';

const enum TypeActionsRedemption {
  LOAD = '[REDEMPTION / API] Redemption Load',
  FAIL = '[REDEMPTION / API] Redemption Fail',
  SUCCESS = '[REDEMPTION / API] Redemption Success',
  RESET = '[REDEMPTION / API] Redemption Reset',
}

export const RedemptionActionLoad = createAction(
  TypeActionsRedemption.LOAD,
  props<{
    totalPoints: string;
    curAmt: string;
    accountId: string;
    accountType: string;
    bankId: string;
    bankName: string;
    otpValue?: string;
    spRefId?: string;
  }>(),
);

export const RedemptionActionSuccess = createAction(
  TypeActionsRedemption.SUCCESS,
  props<{ data: IResRedemption }>(),
);

export const RedemptionActionFail = createAction(
  TypeActionsRedemption.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage: string;
    errorMessageCode: number;
  }>(),
);

export const RedemptionActionReset = createAction(TypeActionsRedemption.RESET);
