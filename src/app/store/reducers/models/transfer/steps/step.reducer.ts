import * as fromStep from '@store/actions/models/transfer/steps/step.action';

export function stepReducer(
  state: number = 1,
  action: fromStep.actions,
): number {
  switch (action.type) {
    case fromStep.SET_STEP:
      return (action as fromStep.SetStepAction).step;

    case fromStep.RESET_STEP:
      return 1;

    default:
      return state;
  }
}
