import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPublicKeyResponse } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { environment } from '@environment';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ChangePasswordService {
  private _loginServerPublicKey: string;

  constructor(private http: HttpClient, private securityUtil: Security) {}

  public execute(data: any): Observable<any> {
    return from(this.getLoginServerPublicKey()).pipe(
      switchMap(() => {
        data['currentPassword'] = this.getEncryptedField(
          data['currentPassword'],
        );
        data['newPassword'] = this.getEncryptedField(data['newPassword']);
        data['confirmedPassword'] = this.getEncryptedField(
          data['confirmedPassword'],
        );

        return this.http.put<any>(
          environment.api.base + environment.api.services.changePassword,
          data,
          {},
        );
      }),
    );
  }

  private getEncryptedField(fieldValue: string): string {
    return ('::encrypt::' +
      this.securityUtil.encryptRsaPkcs1String(
        fieldValue,
        this._loginServerPublicKey,
      )) as string;
  }

  public async getLoginServerPublicKey(): Promise<void> {
    if (isNullOrUndefined(this._loginServerPublicKey)) {
      const url =
        environment.api.base + environment.api.services.getLoginServerPublicKey;
      const response = await this.http
        .get<GetPublicKeyResponse>(url)
        .toPromise();
      this._loginServerPublicKey = response.publicKey;
    }
  }
}
