import { combineReducers } from '@ngrx/store';

import { citiesReducer as cities } from './cities.reducers';
import {
  datePaymentTaxeStepThreeReducer as date,
  newPaymentTaxeStepOneReducer as formOne,
} from './formOneStep.reducer';
import { paymentTaxesReducer as payment } from './payment-taxes.reducers';
import { referenceReducer as reference } from './reference.reducers';
import { stepLineTimeReducer as step } from './step.reducers';
import { taxesReducer as taxes } from './taxes.reducers';

export const PaymentTaxesRootReducer = combineReducers({
  step,
  cities,
  payment,
  taxes,
  reference,
  formOne,
  date,
});
