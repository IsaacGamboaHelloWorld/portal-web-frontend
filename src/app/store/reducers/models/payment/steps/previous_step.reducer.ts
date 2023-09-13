import * as fromPreviousStep from '@store/actions/models/payment/steps/previous_step.action';

export function previousStepReducer(
  state: number = 1,
  action: fromPreviousStep.actions,
): number {
  switch (action.type) {
    case fromPreviousStep.SET_PREVIOUS_STEP:
      return (action as fromPreviousStep.SetPreviousStepAction).step;

    case fromPreviousStep.RESET_PREVIOUS_STEP:
      return 1;

    default:
      return state;
  }
}
