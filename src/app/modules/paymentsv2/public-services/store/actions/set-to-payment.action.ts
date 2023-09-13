import { createAction } from '@ngrx/store';
import { IPublicService } from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[SET PAYMENTS / API] Set Payments Load',
  RESET = '[SET PAYMENTS / API] Set Payments Success',
}

export const SetPublicServicesPaymentsLoad = createAction(
  TypeActions.LOAD,
  (payData: IPublicService) => ({ payData }),
);

export const SetPublicServicesPaymentsReset = createAction(TypeActions.RESET);
