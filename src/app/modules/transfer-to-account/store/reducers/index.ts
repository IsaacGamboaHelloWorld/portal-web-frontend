import { combineReducers } from '@ngrx/store';
import { FormNewTransferReducer as FormNewTransfer } from './form-new-transfer.reducer';
import { formStepOneReducer as formStepOne } from './form-step-one.reducer';
import { formStepThreeReducer as formStepThree } from './form-step-three.reducer';
import { formStepTwoReducer as formStepTwo } from './form-step-two.reducer';
import { NewTransferReducer as NewTransfer } from './new-transfer.reducer';
import { NewTransferStateReducers as step } from './step.reducer';
export const NewTransferRootReducer = combineReducers({
  step,
  formStepOne,
  formStepTwo,
  formStepThree,
  NewTransfer,
  FormNewTransfer,
});
