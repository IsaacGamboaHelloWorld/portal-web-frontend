import { Action } from '@ngrx/store';

import { PocketsByProduct } from '@app/core/models/products/pockets/pocketsByProduct';

export const POCKETS_SUCCESS = '[Pockets Home] pockets Success';
export const POCKETS_FAIL = '[Pockets Home] pockets Fail';
export const POCKETS_RESET = '[Pockets Home] pockets Reset ';
export const POCKETS_LOAD = '[Pockets Home] pockets Load';

export class PocketsLoadAction implements Action {
  readonly type: string = POCKETS_LOAD;
}

export class PocketsSuccessAction implements Action {
  readonly type: string = POCKETS_SUCCESS;

  constructor(public productsWithPocketsInformation: PocketsByProduct[]) {}
}

export class PocketsFailAction implements Action {
  readonly type: string = POCKETS_FAIL;
}

export class PocketsResetAction implements Action {
  readonly type: string = POCKETS_RESET;
}

export type actions =
  | PocketsLoadAction
  | PocketsFailAction
  | PocketsSuccessAction
  | PocketsResetAction;
