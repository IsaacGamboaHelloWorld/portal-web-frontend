import { combineReducers } from '@ngrx/store';
import {
  dateStepThreeReducer as date,
  newPayStackStepOneReducer as formOne,
} from './formOne.reducers';

import {
  billerDetailReducer as billerInfo,
  informationReducer as information,
} from './information.reducers';
import { paystackReducer as payment } from './pay-stack.reducers';
import { payrollReducer as payroll } from './payroll.reducers';
import { stepLineTimeReducer as step } from './step.reducers';

export const PayStackRootReducer = combineReducers({
  step,
  information,
  billerInfo,
  payment,
  payroll,
  formOne,
  date,
});
