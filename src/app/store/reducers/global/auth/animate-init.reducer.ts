import * as fromAnimate from '@store/actions/global/auth/animateInit.action';

export function animateInitReducer(
  state: boolean,
  action: fromAnimate.actions,
): boolean {
  switch (action.type) {
    case fromAnimate.ANIMATE_SHOW:
      return true;
    case fromAnimate.ANIMATE_HIDDEN:
      return false;
    default:
      return state;
  }
}
