import { createAction, props } from '@ngrx/store';
import { ICertificate } from '../../entities/certificate';

const enum TypeActions {
  LOAD = '[CREATE CERTIFICATE DS / API] Create certificate Load',
  FAIL = '[CREATE CERTIFICATE DS / API] Create certificate Fail',
  SUCCESS = '[CREATE CERTIFICATE DS / API] Create certificate Success',
  RESET = '[CREATE CERTIFICATE DS / API] Create certificate Reset',
}

export const CertificateLoad = createAction(
  TypeActions.LOAD,
  props<{ data: any }>(),
);

export const CertificateSuccess = createAction(
  TypeActions.SUCCESS,
  props<{ certificate: ICertificate }>(),
);

export const CertificateFail = createAction(
  TypeActions.FAIL,
  props<{ errorMessage: string }>(),
);

export const CertificateReset = createAction(TypeActions.RESET);
