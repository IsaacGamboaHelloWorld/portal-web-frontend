import * as formWhatDoYouWant from '@store/actions/models/withdrawal/steps/whatdoyouwant.action';

export function whatDoYouWantReducer(
  state: string = '',
  action: formWhatDoYouWant.actions,
): string {
  switch (action.type) {
    case formWhatDoYouWant.SET_TYPE_WITHDRAWAL:
      return (action as formWhatDoYouWant.SetTypeWithdrawal).typeTransaction;

    default:
      return state;
  }
}
