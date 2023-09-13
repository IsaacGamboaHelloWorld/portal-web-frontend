import { createAction } from '@ngrx/store';

import { IPublicService } from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[NEXT PAYMENTS / API] Next Payments Load',
  FAIL = '[NEXT PAYMENTS / API] Next Payments Fail',
  SUCCESS = '[NEXT PAYMENTS / API] Next Payments Success',
  RESET = '[NEXT PAYMENTS / API] Next Payments Success',
}

export const NextPublicServicesPaymentsLoad = createAction(TypeActions.LOAD);

export const NextPublicServicesPaymentsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const NextPublicServicesPaymentsSuccess = createAction(
  TypeActions.SUCCESS,
  (billers: IPublicService[]) => ({ billers }),
);

export const NextPublicServicesPaymentsReset = createAction(TypeActions.RESET);
