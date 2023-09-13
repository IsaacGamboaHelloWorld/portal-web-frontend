import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface AvalpayPaymentResponse extends GenericResponse {
  approvalId: string;
}
