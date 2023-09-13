import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
export interface ChannelResponse extends GenericResponse {
  statusCode?: string;
  statusDescription?: string;
  PB?: boolean;
  MB?: boolean;
}
