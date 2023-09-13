import * as certificatesActions from '@app/store/actions/models/certificates/certificates.action';
import { IPdfdata } from '../../../../core/interfaces/certificates/pdfdata';

export interface CertificatePdfGenState {
  pdfInfo: IPdfdata;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  failedRetries: number;
}

export const initCertificatePdfGen: CertificatePdfGenState = {
  pdfInfo: null,
  loading: false,
  loaded: false,
  error: false,
  failedRetries: 0,
};

export function certPdfGenReducer(
  state: CertificatePdfGenState = initCertificatePdfGen,
  action: certificatesActions.actions,
): CertificatePdfGenState {
  switch (action.type) {
    case certificatesActions.CERTIFICATES_PDF_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case certificatesActions.CERTIFICATES_PDF_SUCCESS:
      return {
        ...state,
        pdfInfo: (action as certificatesActions.CertificatesGeneratePdfSuccessAction)
          .data,
        error: false,
        loading: false,
        loaded: true,
        failedRetries: 0,
      };

    case certificatesActions.CERTIFICATES_PDF_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        failedRetries: state.failedRetries + 1,
      };

    case certificatesActions.CERTIFICATES_PDF_RESET:
      return initCertificatePdfGen;

    default:
      return state;
  }
}
