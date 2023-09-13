import { combineReducers } from '@ngrx/store';
import { registeredObPaymentsReducer as registeredOb } from './registered-ob-reducer';

export const RegisteredOBRootReducer = combineReducers({
  registeredOb,
});
