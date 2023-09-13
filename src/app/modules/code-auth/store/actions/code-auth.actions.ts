import { createAction } from '@ngrx/store';
import { IAnswerAllowedCodeAuth } from '../../entities/code-auth';

const enum TypeActionsAllowed {
  LOAD = '[CREATE CODE_AUTH_ALLOWED / API] Create code_auth_allowed Load',
  FAIL = '[CREATE CODE_AUTH_ALLOWED / API] Create code_auth_allowed Fail',
  SUCCESS = '[CREATE CODE_AUTH_ALLOWED / API] Create code_auth_allowed Success',
  RESET = '[CREATE CODE_AUTH_ALLOWED / API] Create code_auth_allowed Reset',
}

export const CodeAuthAllowedLoad = createAction(TypeActionsAllowed.LOAD);
export const CodeAuthAllowedFail = createAction(
  TypeActionsAllowed.FAIL,
  (data: IAnswerAllowedCodeAuth) => ({ data }),
);
export const CodeAuthAllowedSuccess = createAction(
  TypeActionsAllowed.SUCCESS,
  (data: IAnswerAllowedCodeAuth) => ({ data }),
);
export const CodeAuthAllowedReset = createAction(TypeActionsAllowed.RESET);
