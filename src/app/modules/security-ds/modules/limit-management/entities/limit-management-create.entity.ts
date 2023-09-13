import { GenericRequest, GenericResponse } from '@app/core/interfaces';
import { LimitManagementOperation } from '.';

export interface ILimitManagementCreateRequest extends GenericRequest {
  channel: string;
  limits: ITransferLimitData;
  operation: LimitManagementOperation;
}

export interface ITransferLimitData {
  lastUpdateDate?: string;
  maxAmountTransaction: number;
  maxAmountOperationsByDay: number;
  maxAmountTransactionAnotherBank: number;
  maxAmountOperationsByDayAnotherBank: number;
}

export interface ILimitManagementCreateResponse extends GenericResponse {
  statusDescription: string;
  statusCode: string;
}
