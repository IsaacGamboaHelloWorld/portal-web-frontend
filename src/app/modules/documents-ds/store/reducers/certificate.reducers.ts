import { createReducer, on } from '@ngrx/store';
import { ICertificateState } from './../state/documents.state';

import * as fromCertificate from '../actions/certificate.actions';

export const init: ICertificateState = {
  errorMessage: '',
  fileUrl: '',
  base64: '',
  name: '',
  success: false,
  loading: false,
  loaded: false,
};

export const CertificateReducer = createReducer(
  init,
  on(fromCertificate.CertificateLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      success: false,
      loaded: false,
      loading: true,
      fileUrl: '',
      base64: '',
      name: '',
    };
  }),
  on(fromCertificate.CertificateSuccess, (state, { certificate }) => {
    return {
      ...state,
      success: true,
      loaded: true,
      loading: false,
      fileUrl: certificate.fileUrl,
      base64: certificate.base64,
      name: certificate.name,
    };
  }),
  on(fromCertificate.CertificateFail, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      success: false,
      loaded: true,
      loading: false,
      fileUrl: '',
      base64: '',
      name: '',
    };
  }),
  on(fromCertificate.CertificateReset, (state) => {
    return init;
  }),
);
