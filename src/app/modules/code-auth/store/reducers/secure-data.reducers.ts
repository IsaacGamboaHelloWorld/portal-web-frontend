import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/secure-data.actions';

export const initSecureDataReducer: object = {
  securePhone: '',
  secureEmail: '',
  contactPreference: '',
};

export const SecureDataReducer = createReducer(
  initSecureDataReducer,
  on(
    actions.SecureDataSave,
    (state, { secureEmail, securePhone, contactPreference }) => {
      return {
        secureEmail,
        securePhone,
        contactPreference,
      };
    },
  ),
  on(actions.SecureDataReset, (state) => {
    return initSecureDataReducer;
  }),
);
