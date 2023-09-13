import * as fromStepTwo from '@store/actions/models/payment/steps/form-step-two.action';

export interface FormStepTwoState {
  amount: number | string;
  amounttext: number | string;
  category: string;
  comments: string;
  voucher: string;
  idbill: number | string;
}

export const initFormStepTwo: FormStepTwoState = {
  amount: '',
  amounttext: '',
  category: '',
  comments: '',
  voucher: '',
  idbill: '',
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
