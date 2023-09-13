import * as fromStepThree from '@store/actions/models/payment/steps/form-step-three.action';

export interface FormStepThreeState {
  billerId: number;
  billerNickname: string;
  contract: number;
  reference: number;
  paymentType: string;
  maxAmount: number;
  daysBeforeAfterExpiration: number;
  originAccountId: number;
  originAccountType: string;
}

export const initFormStepThree: FormStepThreeState = {
  billerId: null,
  billerNickname: null,
  contract: null,
  reference: null,
  paymentType: null,
  maxAmount: null,
  daysBeforeAfterExpiration: null,
  originAccountId: null,
  originAccountType: null,
};

export function formStepThreeReducer(
  state: FormStepThreeState = initFormStepThree,
  action: fromStepThree.actions,
): FormStepThreeState {
  switch (action.type) {
    case fromStepThree.SET_FORM_STEP_THREE:
      return (action as fromStepThree.FormStepThreeAction).dataForm;

    case fromStepThree.RESET_FORM_STEP_THREE:
      return initFormStepThree;

    default:
      return state;
  }
}
