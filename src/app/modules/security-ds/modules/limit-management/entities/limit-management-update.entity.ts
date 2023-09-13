import { GenericRequest, GenericResponse } from '@app/core/interfaces';
import { ITransferLimitData, LimitManagementOperation } from '.';

export interface ILimitManagementUpdateRequest extends GenericRequest {
  channel: string;
  limits: ITransferLimitData;
  operation: LimitManagementOperation;
}

export interface ILimitManagementUpdateResponse extends GenericResponse {
  statusDescription: string;
  statusCode: string;
}
