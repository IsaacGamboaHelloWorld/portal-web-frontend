export enum DsStatesCardEnum {
  success = 'success',
  error = 'error',
  warning = 'warning',
  loading = 'loading',
}

export interface IDsStateCard {
  success: string;
  error: string;
  warning: string;
  loading: string;
}
