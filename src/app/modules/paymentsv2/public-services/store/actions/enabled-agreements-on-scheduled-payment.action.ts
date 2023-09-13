import { createAction } from '@ngrx/store';
import { EnabledAgreementsResponse } from '../../entities/enabled-agreements';

const enum TypeActions {
  LOAD = '[LOAD ENABLED_AGREEMENTS_ON_SCHEDULED_PAYMENTS / API] Load enabled agreements on scheduled payments',
  FAIL = '[CREATE ENABLED_AGREEMENTS_ON_SCHEDULED_PAYMENTS / API] Load enabled agreements on scheduled payments fails',
  SUCCESS = '[CREATE ENABLED_AGREEMENTS_ON_SCHEDULED_PAYMENTS / API] Load enabled agreements on scheduled payments success',
  RESET = '[CREATE ENABLED_AGREEMENTS_ON_SCHEDULED_PAYMENTS / API] Clear enabled agreements on scheduled payments',
}

export const EnabledAgreementsLoad = createAction(TypeActions.LOAD);

export const EnabledAgreementsFails = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const EnabledAgreementsSuccess = createAction(
  TypeActions.SUCCESS,
  (data: EnabledAgreementsResponse) => ({ data }),
);
export const EnabledAgreementsReset = createAction(TypeActions.RESET);
