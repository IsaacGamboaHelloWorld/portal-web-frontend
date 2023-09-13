import { combineReducers } from '@ngrx/store';
import { ConfigurationReducer as configuration } from './configuration.reducer';
import { HistoricMovementsReducer as historicMovements } from './historic-movements.reducer';
import { OTPGenerationReducer as otpGeneration } from './otp-generation.reducer';
import { RedemptionReducer as redemption } from './redemption.reducer';
import { YourPlusStateReducers as step } from './step.reducer';

export const YourPlusRootReducer = combineReducers({
  step,
  historicMovements,
  configuration,
  redemption,
  otpGeneration,
});
