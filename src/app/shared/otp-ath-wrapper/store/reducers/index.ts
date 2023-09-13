import { combineReducers } from '@ngrx/store';
import { OtpAthGenerateReducer as generate } from './otp-ath-generate.reducers';
import { OtpAthModalFlowReducer as flow } from './otp-ath-modal-flow.reducers';
import { OtpAthModalReducer as modal } from './otp-ath-modal.reducers';
import { OtpAthValidateReducer as validate } from './otp-ath-validate.reducers';

export const OtpAthRootReducer = combineReducers({
  generate,
  validate,
  modal,
  flow,
});
