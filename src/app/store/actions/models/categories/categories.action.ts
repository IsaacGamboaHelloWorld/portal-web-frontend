import { Action } from '@ngrx/store';

export const LOAD_CATEGORIES = '[Global] Load Categories';
export const SUCCESS_CATEGORIES = '[Global] Success Categories';
export const ERROR_CATEGORIES = '[Global] Error Categories';

export class LoadCategoriesAction implements Action {
  readonly type: string = LOAD_CATEGORIES;
}

export class SuccessCategoriesAction implements Action {
  readonly type: string = SUCCESS_CATEGORIES;

  constructor(public categories: string[]) {}
}

export class ErrorCategoriesAction implements Action {
  readonly type: string = ERROR_CATEGORIES;
}

export type actions =
  | LoadCategoriesAction
  | SuccessCategoriesAction
  | ErrorCategoriesAction;
