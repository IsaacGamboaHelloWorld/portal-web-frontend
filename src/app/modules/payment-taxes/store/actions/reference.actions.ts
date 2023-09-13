import { createAction } from '@ngrx/store';
import { IReference } from '../../entities/payment-taxes';

const enum TypeActions {
  LOAD = '[CREATE REFERENCE / API] Create reference Load reference',
  FAIL = '[CREATE REFERENCE / API] Create reference Fail reference',
  SUCCESS = '[CREATE REFERENCE / API] Create reference Success reference',
  RESET = '[CREATE REFERENCE / API] Create reference Reset reference',
}

export const ReferenceLoad = createAction(
  TypeActions.LOAD,
  (noReference: number, biller: string) => ({ noReference, biller }),
);

export const ReferenceFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const ReferenceSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IReference) => ({ data }),
);
export const ReferenceReset = createAction(TypeActions.RESET);
