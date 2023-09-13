import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { ChannelResponse } from '../entities/channel-response.interface';

// **  https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2127954382/Administration-api+Bloqueo+de+Canales **/

@Injectable()
export class ChannelLockService {
  constructor(private http: HttpClient) {}

  public channelLockCreate(
    PB: boolean,
    MB: boolean,
  ): Observable<ChannelResponse> {
    const body = {
      PB,
      MB,
    };
    return this.http.post<ChannelResponse>(
      environment.api.base + environment.api.services.channel_lock.create,
      body,
    );
  }

  public channelLockUpdate(
    PB: boolean,
    MB: boolean,
  ): Observable<ChannelResponse> {
    const body = {
      PB,
      MB,
    };
    return this.http.post<ChannelResponse>(
      environment.api.base + environment.api.services.channel_lock.update,
      body,
    );
  }

  public channelLockGet(): Observable<ChannelResponse> {
    return this.http.post<ChannelResponse>(
      environment.api.base + environment.api.services.channel_lock.get,
      {},
    );
  }

  public channelLockDelete(): Observable<ChannelResponse> {
    return this.http.post<ChannelResponse>(
      environment.api.base + environment.api.services.channel_lock.delete,
      {},
    );
  }
}
