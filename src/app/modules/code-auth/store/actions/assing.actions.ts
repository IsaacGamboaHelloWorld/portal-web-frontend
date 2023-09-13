import { createAction } from '@ngrx/store';
import {
  IAnswerAssignCodeAuth,
  ISendAssignCodeAuth,
} from '../../entities/code-auth';

const enum TypeActionsAssign {
  LOAD = '[CREATE CODE_AUTH_ASSIGN / API] Create code_auth_assign Loadd',
  FAIL = '[CREATE CODE_AUTH_ASSIGN / API] Create code_auth_assign Fail',
  SUCCESS = '[CREATE CODE_AUTH_ASSIGN / API] Create code_auth_assign Success',
  RESET = '[CREATE CODE_AUTH_ASSIGN / API] Create code_auth_assign Reset',
}

export const CodeAuthAssignLoad = createAction(
  TypeActionsAssign.LOAD,
  (data: ISendAssignCodeAuth) => ({
    data,
  }),
);
export const CodeAuthAssignFail = createAction(
  TypeActionsAssign.FAIL,
  (data: IAnswerAssignCodeAuth) => ({ data }),
);
export const CodeAuthAssignSuccess = createAction(
  TypeActionsAssign.SUCCESS,
  (data: IAnswerAssignCodeAuth) => ({ data }),
);
export const CodeAuthAssignReset = createAction(TypeActionsAssign.RESET);
