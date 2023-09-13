import { GenericRequest } from '.';

export interface GenericResponse {
  success: boolean;
  errorMessage?: string;
  errorStatusCode?: string;
  specificErrorMessage?: string;
  specificErrorCode?: string;
  dateTime?: string;
  request?: GenericRequest;
}
