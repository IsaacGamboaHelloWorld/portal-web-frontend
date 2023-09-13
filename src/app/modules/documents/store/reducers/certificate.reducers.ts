import { createReducer, on } from '@ngrx/store';
import { ICertificate } from '../../entities/documents';

import * as fromCertificate from '../actions/certificate.actions';

export const init: ICertificate = {
  errorMessage: '',
  fileUrl: '',
  base64: '',
  name: '',
  success: false,
};

export const CertificateReducer = createReducer(
  init,
  on(fromCertificate.CertificateLoad, (state) => {
    return {
      ...state,
      errorMessage: '',
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromCertificate.CertificateSuccess, (state, { data }) => {
    return {
      success: data.success,
      fileUrl: data.fileUrl,
      base64: data.base64,
      name: data.name,
      errorMessage: data.errorMessage,
    };
  }),
  on(fromCertificate.CertificateFail, (state, { data }) => {
    return {
      errorMessage: data,
      fileUrl: '',
      base64: '',
      name: '',
      success: false,
    };
  }),
  on(fromCertificate.CertificateReset, (state) => {
    return init;
  }),
);
