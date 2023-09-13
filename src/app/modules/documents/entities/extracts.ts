export interface ExtractsState {
  tributary: IExtracts;
}

export interface IExtracts {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}
