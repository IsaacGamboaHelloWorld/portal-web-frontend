import { combineReducers } from '@ngrx/store';

import { banksPseReducer as banks } from './banks-pse.reducers';
import { formOneFdReducer as formOne } from './form-one.reducers';
import { formThreeFdReducer as formThree } from './form-three.reducers';
import { formTwoFdReducer as formTwo } from './form-two.reducers';
import { initPaymentPseReducer as initPayment } from './init-pse.reducers';
import { statusPaymentPseReducer as statusPayment } from './status-pse.reducers';
import { lineTimeReducer as lineTime } from './step.reducers';

export const PaymentObFreeDestinationReducer = combineReducers({
  lineTime,
  formOne,
  formTwo,
  formThree,
  banks,
  initPayment,
  statusPayment,
});
