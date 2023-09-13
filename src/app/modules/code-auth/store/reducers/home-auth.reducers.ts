import { createReducer, on } from '@ngrx/store';
import { IAnswerSecureData } from '../../entities/code-auth';
import * as fromCodeAuth from '../actions/home-auth.actions';

export const initSecureDataCodeAuth: IAnswerSecureData = {
  secureEmail: '',
  secureTelephone: '',
  contactPreference: '',
  ComponentID: '',
  PartyAssociation: [],
  success: false,
  loading: false,
  phoneNumber: '',
  email: '',
  ind: '',
};

export const CodeAuthSecureDataReducer = createReducer(
  initSecureDataCodeAuth,
  on(fromCodeAuth.CodeAuthSecureDataLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      loading: true,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataSuccess, (state, { data }) => {
    return {
      secureEmail: data.secureEmail,
      secureTelephone: data.secureTelephone,
      contactPreference: data.contactPreference,
      ComponentID: data.ComponentID,
      PartyAssociation: data.PartyAssociation,
      success: data.success,
      loading: false,
      phoneNumber: data.phoneNumber,
      email: data.email,
      ind: data.ind,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataFail, (state, { data }) => {
    return {
      secureEmail: data.secureEmail,
      secureTelephone: data.secureTelephone,
      contactPreference: data.contactPreference,
      ComponentID: data.ComponentID,
      PartyAssociation: data.PartyAssociation,
      phoneNumber: data.phoneNumber,
      email: data.email,
      ind: data.ind,
      success: false,
      loading: false,
    };
  }),
  on(fromCodeAuth.CodeAuthSecureDataReset, (state) => {
    return initSecureDataCodeAuth;
  }),
);
