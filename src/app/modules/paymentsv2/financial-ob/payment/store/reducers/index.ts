import { combineReducers } from '@ngrx/store';

import { backHomeReducer as backHome } from './back-home.reducer';
import { newPaymentStepOneReducer as formOne } from './formOneStep.reducer';
import { newPaymentStepThreeReducer as formThree } from './formThreeStep.reducer';
import { newPaymentStepTwoReducer as formTwo } from './formTwoStep.reducer';
import { savePaymentReducer as returnedInfo } from './newPayment.reducer';
import { stepLineTimeReducer as step } from './step.reducer';

export const NewPaymentFORootReducer = combineReducers({
  formOne,
  formTwo,
  formThree,
  returnedInfo,
  step,
  backHome,
});
