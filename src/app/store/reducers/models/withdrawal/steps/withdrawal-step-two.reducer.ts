import * as formWithdrawalStepTwo from '@store/actions/models/withdrawal/steps/withdrawalsteptwo.action';

export interface TempProduct {
  accountType: '';
  accountId: '';
}

export interface WithDrawalStepTwoState {
  product: TempProduct;
  where: string;
  amount: number;
  otheramount?: number;
  document?: string;
  textVoucher?: string;
  textBtnAgain?: string;
}

export const initWithDrawalStepTwoState: WithDrawalStepTwoState = {
  product: null,
  where: '',
  amount: null,
  document: '',
};

export function withdrawalStepTwoReducer(
  state: WithDrawalStepTwoState = initWithDrawalStepTwoState,
  action: formWithdrawalStepTwo.actions,
): WithDrawalStepTwoState {
  switch (action.type) {
    case formWithdrawalStepTwo.SET_WITHDRAWAL_STEP_TWO:
      return (action as formWithdrawalStepTwo.SetWithDrawalStepTwoAction)
        .dataForm;

    case formWithdrawalStepTwo.RESET_WITHDRAWAL_STEP_TWO:
      return initWithDrawalStepTwoState;

    default:
      return state;
  }
}
