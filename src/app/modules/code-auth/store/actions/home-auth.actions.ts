import { createAction } from '@ngrx/store';
import {
  IAnswerGetQuestion,
  IAnswerSecureData,
  IAnswerSecureValidQuestion,
  IAnswerUpdateSecureData,
  ISendEnrollSecureData,
  IUpdateSecureData,
} from '../../entities/code-auth';

const enum TypeActionsSecureData {
  LOAD = '[CREATE CODE_AUTH_HOME / API] Create code_auth_home Loadd',
  FAIL = '[CREATE CODE_AUTH_HOME / API] Create code_auth_home Fail',
  SUCCESS = '[CREATE CODE_AUTH_HOME / API] Create code_auth_home Success',
  RESET = '[CREATE CODE_AUTH_HOME / API] Create code_auth_home Reset',
}

const enum TypeActionsSecureDataUpdate {
  LOAD = '[CREATE CODE_AUTH_UPDATE_MDM / API] Create code_auth_update_mdm Loadd',
  FAIL = '[CREATE CODE_AUTH_UPDATE_MDM / API] Create code_auth_update_mdm Fail',
  SUCCESS = '[CREATE CODE_AUTH_UPDATE_MDM / API] Create code_auth_update_mdm Success',
  RESET = '[CREATE CODE_AUTH_UPDATE_MDM / API] Create code_auth_update_mdm Reset',
}

const enum TypeActionsSecureDataQuestion {
  LOAD = '[CREATE CODE_AUTH_GET_QUESTION / API] Create code_auth_get_question Loadd',
  FAIL = '[CREATE CODE_AUTH_GET_QUESTION / API] Create code_auth_get_question Fail',
  SUCCESS = '[CREATE CODE_AUTH_GET_QUESTION / API] Create code_auth_get_question Success',
  RESET = '[CREATE CODE_AUTH_GET_QUESTION / API] Create code_auth_get_question Reset',
}

const enum TypeActionsSecureDataValidQuestion {
  LOAD = '[CREATE CODE_AUTH_VALID_QUESTION / API] Create code_auth_valid_question Loadd',
  FAIL = '[CREATE CODE_AUTH_VALID_QUESTION / API] Create code_auth_valid_question Fail',
  SUCCESS = '[CREATE CODE_AUTH_VALID_QUESTION / API] Create code_auth_valid_question Success',
  RESET = '[CREATE CODE_AUTH_VALID_QUESTION / API] Create code_auth_valid_question Reset',
}

// Get

export const CodeAuthSecureDataLoad = createAction(TypeActionsSecureData.LOAD);
export const CodeAuthSecureDataFail = createAction(
  TypeActionsSecureData.FAIL,
  (data: IAnswerSecureData) => ({ data }),
);
export const CodeAuthSecureDataSuccess = createAction(
  TypeActionsSecureData.SUCCESS,
  (data: IAnswerSecureData) => ({ data }),
);
export const CodeAuthSecureDataReset = createAction(
  TypeActionsSecureData.RESET,
);

// Update

export const CodeAuthSecureDataUpdateLoad = createAction(
  TypeActionsSecureDataUpdate.LOAD,
  (data: IUpdateSecureData) => ({ data }),
);
export const CodeAuthSecureDataUpdateFail = createAction(
  TypeActionsSecureDataUpdate.FAIL,
  (data: IAnswerUpdateSecureData) => ({ data }),
);
export const CodeAuthSecureDataUpdateSuccess = createAction(
  TypeActionsSecureDataUpdate.SUCCESS,
  (data: IAnswerUpdateSecureData) => ({ data }),
);
export const CodeAuthSecureDataUpdateReset = createAction(
  TypeActionsSecureDataUpdate.RESET,
);

// Get Question

export const CodeAuthSecureQuestionLoad = createAction(
  TypeActionsSecureDataQuestion.LOAD,
);
export const CodeAuthSecureQuestionFail = createAction(
  TypeActionsSecureDataQuestion.FAIL,
  (data: IAnswerGetQuestion) => ({ data }),
);
export const CodeAuthSecureQuestionSuccess = createAction(
  TypeActionsSecureDataQuestion.SUCCESS,
  (data: IAnswerGetQuestion) => ({ data }),
);
export const CodeAuthSecureQuestionReset = createAction(
  TypeActionsSecureDataQuestion.RESET,
);

// Valid Question

export const CodeAuthSecureValidQuestionLoad = createAction(
  TypeActionsSecureDataValidQuestion.LOAD,
  (data: ISendEnrollSecureData) => ({ data }),
);
export const CodeAuthSecureValidQuestionFail = createAction(
  TypeActionsSecureDataValidQuestion.FAIL,
  (data: IAnswerSecureValidQuestion) => ({ data }),
);
export const CodeAuthSecureValidQuestionSuccess = createAction(
  TypeActionsSecureDataValidQuestion.SUCCESS,
  (data: IAnswerSecureValidQuestion) => ({ data }),
);
export const CodeAuthSecureValidQuestionReset = createAction(
  TypeActionsSecureDataValidQuestion.RESET,
);
