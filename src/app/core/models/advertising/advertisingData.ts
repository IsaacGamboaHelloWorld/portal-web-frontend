import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface AdvertisingResponse extends GenericResponse {
  advertising: Map<string, AdvertisingInfo>;
}

export interface AdvertisingInfo {
  values?: Map<string, string>;
  error_messages: string;
}
