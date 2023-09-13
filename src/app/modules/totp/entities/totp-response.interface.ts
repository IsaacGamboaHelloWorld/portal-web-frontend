import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IGenerateTotpResponse extends GenericResponse {
  qr: string;
  id: string;
  secret: string;
}
export interface IRegisterTotpResponse extends GenericResponse {
  success: boolean;
}

export interface IDevicesTotpResponse extends GenericResponse {
  algorithm: string;
  length: number;
  period: string;
  devices: IDeviceItem[];
}

export interface IDeviceItem {
  valid: boolean;
  name: string;
  active: boolean;
  id: string;
  secret: string;
}
export interface IDeleteTotpResponse extends GenericResponse {
  success: boolean;
}
