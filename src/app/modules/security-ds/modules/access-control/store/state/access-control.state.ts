export const AccessControlFeatureName = 'AccessControlModuleState';

export interface IAccessControlModuleState {
  statusChannel: IGenericChannel<IDataChannel>;
  cudStatusChannel: IGenericChannel<ICudChannel>;
}

export interface IGenericChannel<T> {
  data: T;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IDataChannel {
  PB: boolean;
  MB: boolean;
}

export interface ICudChannel {
  operation: 'create' | 'update' | 'delete';
  statusCode: string;
  statusDescription: string;
}
