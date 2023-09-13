import { GenericResponse } from './generic-response.interface';

export interface OtpWithDrawal extends GenericResponse {
  otp: string;
  validityTime: string;
  approvalId: string;
}
