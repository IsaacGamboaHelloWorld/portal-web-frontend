import { createAction } from '@ngrx/store';

import { IPublicService } from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[REGISTERED BILLS / API] Registered bills Load',
  FAIL = '[REGISTERED BILLS / API] Registered bills Fail',
  SUCCESS = '[REGISTERED BILLS / API] Registered bills Success',
  RESET = '[REGISTERED BILLS / API] Registered bills Success',
}

export const AllPublicServicesPaymentsLoad = createAction(TypeActions.LOAD);

export const AllPublicServicesPaymentsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const AllPublicServicesPaymentsSuccess = createAction(
  TypeActions.SUCCESS,
  (billers: IPublicService[]) => ({ billers }),
);

export const AllPublicServicesPaymentsReset = createAction(TypeActions.RESET);
