import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IresponsePSEpay extends GenericResponse {
  authorizationNumber: string;
}
