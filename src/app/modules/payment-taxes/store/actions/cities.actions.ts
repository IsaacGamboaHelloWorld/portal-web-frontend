import { createAction } from '@ngrx/store';
import { ICities } from '../../entities/payment-taxes';

const enum TypeActions {
  LOAD = '[CREATE CITIES / API] Create cities Load cities',
  FAIL = '[CREATE CITIES / API] Create cities Fail cities',
  SUCCESS = '[CREATE CITIES / API] Create cities Success cities',
}

export const CitiesLoad = createAction(TypeActions.LOAD);

export const CitiesFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CitiesSuccess = createAction(
  TypeActions.SUCCESS,
  (data: ICities) => ({ data }),
);
