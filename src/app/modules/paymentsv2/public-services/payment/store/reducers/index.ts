import { combineReducers } from '@ngrx/store';

import { backHomeReducer as backHome } from './back-home.reducer';
import { newPaymenttepOneReducer as formOne } from './formOneStep.reducer';
import { newPaymenttepTwoReducer as formTwo } from './formTwoStep.reducer';
import { savePaymentReducer as returnedInfo } from './newPayment.reducer';

export const NewPaymentRootReducer = combineReducers({
  formOne,
  formTwo,
  returnedInfo,
  backHome,
});
