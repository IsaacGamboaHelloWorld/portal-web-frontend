import { combineReducers } from '@ngrx/store';
import { TotpDeleteReducer as deleteTotp } from './totp-delete.reducers';
import { TotpDevicesReducer as devices } from './totp-devices.reducers';
import { TotpGenerateReducer as generate } from './totp-generate.reducers';
import { TotpRegisterReducer as register } from './totp-register.reducers';

export const TotpRootReducer = combineReducers({
  generate,
  register,
  devices,
  deleteTotp,
});
