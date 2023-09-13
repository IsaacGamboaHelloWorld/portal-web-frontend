import { GenericRequest, GenericResponse } from '@app/core/interfaces';
import { LimitManagementOperation } from '.';

export interface ILimitManagementDeleteRequest extends GenericRequest {
  channel: string;
  operation: LimitManagementOperation;
}

export interface ILimitManagementDeleteResponse extends GenericResponse {
  statusDescription: string;
  statusCode: string;
}
