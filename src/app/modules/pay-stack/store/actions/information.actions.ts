import { createAction } from '@ngrx/store';
import { IAnswerInformation, ISendInformation } from '../../entities/pay-stack';

const enum TypeActions {
  LOAD = '[CREATE INFORMATION / API] Create information Load',
  FAIL = '[CREATE INFORMATION / API] Create information Fail',
  SUCCESS = '[CREATE INFORMATION / API] Create information Success',
  RESET = '[CREATE INFORMATION / API] Create information Reset',
}

export const InformationLoad = createAction(
  TypeActions.LOAD,
  (data: ISendInformation) => ({ data }),
);

export const InformationFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const InformationSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerInformation) => ({ data }),
);

export const InformationReset = createAction(TypeActions.RESET);
