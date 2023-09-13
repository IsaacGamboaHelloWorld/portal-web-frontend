export interface ICertificate {
  fileUrl: string;
  base64: string;
  name: string;
  success?: boolean;
  loading?: boolean;
  loaded?: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
}
