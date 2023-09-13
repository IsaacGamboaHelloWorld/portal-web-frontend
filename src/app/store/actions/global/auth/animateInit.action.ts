import { Action } from '@ngrx/store';

export const ANIMATE_SHOW = '[AUTH] Animate Show';
export const ANIMATE_HIDDEN = '[AUTH] Animate Hidden';

export class AnimateShowAction implements Action {
  readonly type: string = ANIMATE_SHOW;
}

export class AnimateHiddenAction implements Action {
  readonly type: string = ANIMATE_HIDDEN;
}

export type actions = AnimateShowAction | AnimateHiddenAction;
