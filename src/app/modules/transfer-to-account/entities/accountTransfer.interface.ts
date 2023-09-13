import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface AccountTransferInterface extends GenericResponse {
  approvalId?: number | string;
  response?: any;
}
