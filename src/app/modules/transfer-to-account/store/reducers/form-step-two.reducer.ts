import * as fromStepTwo from '../actions/form-step-two.action';

export interface FormStepTwoState {
  amount: number | string;
  description: string;
  voucher: string;
  transactionCost: string;
}

export const initFormStepTwo: FormStepTwoState = {
  amount: '',
  description: '',
  voucher: '',
  transactionCost: '',
};

export function formStepTwoReducer(
  state: FormStepTwoState = initFormStepTwo,
  action: fromStepTwo.actions,
): FormStepTwoState {
  switch (action.type) {
    case fromStepTwo.SET_FORM_STEP_TWO:
      return (action as fromStepTwo.FormStepTwoAction).dataForm;

    case fromStepTwo.RESET_FORM_STEP_TWO:
      return initFormStepTwo;

    default:
      return state;
  }
}
