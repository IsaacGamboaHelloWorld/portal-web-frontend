export class MovementsFileState {
  data: MovementsFileResponse;
  error: boolean;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

export class MovementsFileResponse {
  base64: string;
  success: string;
  errorMessage: string;
  name: string;
}
