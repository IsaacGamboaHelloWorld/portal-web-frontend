import { GenericResponse } from './generic-response.interface';

export interface AccountTransferInterface extends GenericResponse {
  approvalId?: number | string;
  response?: any;
}
