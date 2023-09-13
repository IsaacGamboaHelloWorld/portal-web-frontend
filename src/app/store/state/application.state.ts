import {
  AdvanceModuleState,
  initAdvance,
} from '@app/modules/advance/store/state/advance-module.state';
import {
  initPaymentFreeDestination,
  IPaymentObFreeDestiantionState,
} from '@app/modules/paymentsv2/financial-ob/payment-fd-pse/store/state/payment-fd-pse.state';
import {
  initSecurityState,
  ISecurityModuleState,
} from '@app/modules/security-ds/store/state/security-state';
import {
  initTotpState,
  ITotpModuleState,
} from '@app/modules/totp/store/state/totp.state';
import {
  initOtpAthState,
  IOtpAthModuleState,
} from '@app/shared/otp-ath-wrapper/store/state/otp-auth.state';
import { GlobalState, INITIAL_GLOBALS_STATE } from './global.state';
import { INITIAL_MODELS_STATE, ModelsState } from './model.state';

export type ApplicationState = Readonly<{
  global: GlobalState;
  models: ModelsState;
  securityModuleState: ISecurityModuleState;
  paymentObFreeDestiantionState: IPaymentObFreeDestiantionState;
  totpModuleState: ITotpModuleState;
  AdvanceModuleState: AdvanceModuleState;
  OtpAth: IOtpAthModuleState;
}>;

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  global: INITIAL_GLOBALS_STATE,
  models: INITIAL_MODELS_STATE,
  securityModuleState: initSecurityState,
  paymentObFreeDestiantionState: initPaymentFreeDestination,
  totpModuleState: initTotpState,
  AdvanceModuleState: initAdvance,
  OtpAth: initOtpAthState,
};
