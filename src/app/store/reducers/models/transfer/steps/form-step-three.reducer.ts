import * as fromStepThree from '@store/actions/models/transfer/steps/form-step-three.action';

export interface FormStepThreeState {
  dueDate: Date;
  scheduledTransfer: string;
  favorite: boolean;
}

export const initFormStepThree: FormStepThreeState = {
  dueDate: null,
  scheduledTransfer: '',
  favorite: false,
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
