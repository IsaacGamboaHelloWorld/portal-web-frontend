import * as fromStep from '@store/actions/models/withdrawal/steps/stepw.action';

export function stepWReducer(
  state: number = 1,
  action: fromStep.actions,
): number {
  switch (action.type) {
    case fromStep.SET_STEP_W:
      return (action as fromStep.SetStepWAction).step;

    case fromStep.RESET_STEP_W:
      return 1;

    default:
      return state;
  }
}
