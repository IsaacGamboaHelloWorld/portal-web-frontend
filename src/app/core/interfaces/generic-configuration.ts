export interface GenericConfiguration {
  data: any;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
  error?: boolean;
  step?: number;
}
