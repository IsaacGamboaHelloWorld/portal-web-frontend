import { combineReducers } from '@ngrx/store';
import { infoPaymentUtilReducer as infoReducer } from './info-payment.reducers';

export const RegisteredSPRootReducer = combineReducers({
  infoReducer,
});
