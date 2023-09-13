import { Action } from '@ngrx/store';
import { IPdfdata } from '../../../../core/interfaces/certificates/pdfdata';

export const CERTIFICATES_PDF_SUCCESS =
  '[Certificates Pdf] certificates Pdf Success';
export const CERTIFICATES_PDF_FAIL = '[Certificates Pdf] certificates Pdf Fail';
export const CERTIFICATES_PDF_RESET =
  '[Certificates Pdf] certificates Pdf Reset ';
export const CERTIFICATES_PDF_LOAD = '[Certificates Pdf] certificates Pdf Load';

export class CertificatesGeneratePdfAction implements Action {
  readonly type: string = CERTIFICATES_PDF_LOAD;
  constructor(
    public accountType: string,
    public accountId: string,
    public includeBalance: boolean,
  ) {}
}

export class CertificatesGeneratePdfSuccessAction implements Action {
  readonly type: string = CERTIFICATES_PDF_SUCCESS;
  constructor(public data: IPdfdata) {}
}

export class CertificatesGeneratePdfFailAction implements Action {
  readonly type: string = CERTIFICATES_PDF_FAIL;
}

export class CertificatesGeneratePdfResetAction implements Action {
  readonly type: string = CERTIFICATES_PDF_RESET;
}

export type actions =
  | CertificatesGeneratePdfAction
  | CertificatesGeneratePdfSuccessAction
  | CertificatesGeneratePdfFailAction
  | CertificatesGeneratePdfResetAction;
