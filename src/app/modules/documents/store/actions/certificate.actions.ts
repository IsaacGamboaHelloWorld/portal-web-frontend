import { createAction } from '@ngrx/store';
import { ICertificate } from '../../entities/documents';

const enum TypeActions {
  LOAD = '[CREATE CERTIFICATE / API] Create certificate Load',
  FAIL = '[CREATE CERTIFICATE / API] Create certificate Fail',
  SUCCESS = '[CREATE CERTIFICATE / API] Create certificate Success',
  RESET = '[CREATE CERTIFICATE / API] Create certificate Reset',
}

export const CertificateLoad = createAction(
  TypeActions.LOAD,
  (data?: object) => ({
    data,
  }),
);

export const CertificateFail = createAction(
  TypeActions.FAIL,
  (data: string) => ({
    data,
  }),
);
export const CertificateSuccess = createAction(
  TypeActions.SUCCESS,
  (data: ICertificate) => ({ data }),
);

export const CertificateReset = createAction(TypeActions.RESET);
