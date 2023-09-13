import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  IDevicesTotpResponse,
  IGenerateTotpResponse,
  IRegisterTotpResponse,
} from '../entities/totp-response.interface';

@Injectable()
export class ToptService {
  constructor(private http: HttpClient) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1171357871/TOTP+-+Generate
  public generate(): Observable<IGenerateTotpResponse> {
    return this.http.post<IGenerateTotpResponse>(
      environment.api.base + environment.api.services.totp.generate,
      {},
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1170931914/TOTP+-+Register
  public register(
    name: string,
    totpId: string,
    code: string,
  ): Observable<IRegisterTotpResponse> {
    const body = {
      name,
      totpId,
      code,
    };
    return this.http.post<IRegisterTotpResponse>(
      environment.api.base + environment.api.services.totp.register,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1168999098/TOTP+-+Devices
  public devices(): Observable<IDevicesTotpResponse> {
    return this.http.post<IDevicesTotpResponse>(
      environment.api.base + environment.api.services.totp.devices,
      {},
    );
  }
  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1168999155/TOTP+-+Delete
  public delete(totpId: string): Observable<IDevicesTotpResponse> {
    const body = {
      totpId,
    };
    return this.http.post<IDevicesTotpResponse>(
      environment.api.base + environment.api.services.totp.delete,
      body,
    );
  }
}
