import { createAction } from '@ngrx/store';

import { IPublicService } from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[SELECT PAYMENT / API] Select payment Load',
  FAIL = '[SELECT PAYMENT / API] Select payment Fail',
  SUCCESS = '[SELECT PAYMENT / API] Select payment Success',
  RESET = '[SELECT PAYMENT / API] Select payment Success',
}

export const SelectPaymentLoad = createAction(
  TypeActions.LOAD,
  (payment: IPublicService) => ({ payment }),
);
export const SelectPaymentSuccess = createAction(TypeActions.SUCCESS);

export const SelectPaymentReset = createAction(TypeActions.RESET);
