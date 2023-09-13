import { combineReducers } from '@ngrx/store';
import { CodeAuthAssignReducer as assignCode } from './assing.reducers';
import { CodeAuthAllowedReducer as allowed } from './code-auth.reducers';
import { ExperianFlowReducer as experian } from './experian.reducers';
import { CodeAuthSecureQuestionReducer as getQuestion } from './get-secure-question.reducers';
import { CodeAuthSecureDataReducer as getSecureData } from './home-auth.reducers';
import { SecureDataReducer as userSecureData } from './secure-data.reducers';
import { StepBarReducer as step } from './step.reducers';
import { CodeAuthUpdateSecureDataReducer as updateSecureData } from './update-secure-data.reducers';
import { CodeAuthSecureValidQuestionReducer as validQuestion } from './valid-secure-question.reducers';

export const CodeAuthRootReducer = combineReducers({
  assignCode,
  allowed,
  step,
  getSecureData,
  updateSecureData,
  getQuestion,
  validQuestion,
  experian,
  userSecureData,
});
