import { createReducer, on } from '@ngrx/store';
import {
  TotpDevicesFail,
  TotpDevicesLoad,
  TotpDevicesReset,
  TotpDevicesSuccess,
} from '../actions/totp-devices.actions';
import { ITotpDevices } from '../state/totp.state';

export const initTotpDevices: ITotpDevices = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const TotpDevicesReducer = createReducer(
  initTotpDevices,
  on(TotpDevicesLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
    };
  }),
  on(TotpDevicesSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(TotpDevicesFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(TotpDevicesReset, (_state) => initTotpDevices),
);
