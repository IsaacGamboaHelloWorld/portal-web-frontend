import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { environment } from '@environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as SecurityUtils from '../../modules/security/utils/security.util';

@Injectable()
export class WebAuthnService {
  private startTime: number = 0;

  constructor(
    private http: HttpClient,
    protected model: ApplicationModel,
    private translate: TranslateService,
  ) {}

  private getInitRegisterData(): Observable<any> {
    return this.http.post<any>(
      environment.api.base + environment.api.services.web_authn.initRegister,
      {},
    );
  }
  public updateCredential(
    credential: string,
    newName: string,
  ): Observable<any> {
    const obj = {
      active: true,
      credentialId: credential,
      name: newName,
      usages: ['LOGIN'],
    };
    return this.http.post<any>(
      environment.api.base +
        environment.api.services.web_authn.updateCredential,
      obj,
    );
  }

  public deleteCredential(credential: string): Observable<any> {
    const obj = {
      credentialId: credential,
    };
    return this.http.post<any>(
      environment.api.base +
        environment.api.services.web_authn.deleteCredential,
      obj,
    );
  }

  public listCredentials(): Observable<any> {
    const obj = {
      usages: ['LOGIN'],
    };
    return this.http.post<any>(
      environment.api.base + environment.api.services.web_authn.all,
      obj,
    );
  }

  private async createCredential(data: any): Promise<any> {
    data['authenticatorSelection'] = {};
    this.startTime = Date.now();
    data.challenge = SecurityUtils.convertBase64ToArrayBuffer(data.challenge);
    data.user.id = SecurityUtils.convertBase64ToArrayBuffer(data.user.id);
    if (!isNullOrUndefined(data.excludeCredentials)) {
      data.excludeCredentials.forEach((element: any) => {
        element.id = SecurityUtils.convertBase64ToArrayBuffer(element.id);
      });
    }
    return navigator['credentials'].create({
      publicKey: data,
    });
  }

  private registerCredential(credential: any): Observable<any> {
    const data: any = {};
    data.id = credential['id'];
    data.type = credential['type'];
    data.rawId = SecurityUtils.convertArrayBufferToBase64(credential['rawId']);
    data.response = {};
    data.response.attestationObject = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].attestationObject,
    );
    data.response.clientDataJSON = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].clientDataJSON,
    );
    return this.http.post<any>(
      environment.api.base + environment.api.services.web_authn.register,
      {
        publicKeyCredential: data,
      },
    );
  }

  public async register(): Promise<any> {
    return this.getInitRegisterData()
      .toPromise()
      .then((data) => {
        if (!data.success) {
          return data;
        }
        return this.createCredential(data)
          .then((credential) => {
            return this.registerCredential(credential)
              .toPromise()
              .then((registerResponse) => {
                return registerResponse;
              })
              .catch((error) => {
                return {
                  errorMessage: this.translate.instant(
                    'WEB_AUTHN.ERROR.NETWORK',
                  ),
                  success: false,
                };
              });
          })
          .catch((error) => {
            if (Date.now() - this.startTime < 500) {
              return {
                errorMessage: this.translate.instant(
                  'WEB_AUTHN.ERROR.ALREADY_REGISTERED',
                ),
                success: false,
              };
            } else {
              return {
                errorMessage: this.translate.instant(
                  'WEB_AUTHN.ERROR.NOT_ALLOWED',
                ),
                success: false,
              };
            }
          });
      })
      .catch((error) => {
        return {
          errorMessage: this.translate.instant('WEB_AUTHN.ERROR.NETWORK'),
          success: false,
        };
      });
  }

  public async getInitAuthData(): Promise<any> {
    return this.getUserData()
      .then((userInfo) => {
        userInfo['usage'] = 'LOGIN';
        return this.http
          .post<any>(
            environment.api.base + environment.api.services.web_authn.initAuth,
            userInfo,
          )
          .toPromise();
      })
      .catch((error) => {
        return {
          errorMessage: this.translate.instant('WEB_AUTHN.ERROR.UNEXPECTED'),
          success: false,
        };
      });
  }

  public async getCredential(data: any): Promise<any> {
    this.startTime = Date.now();
    data.challenge = SecurityUtils.convertBase64ToArrayBuffer(data.challenge);
    data.allowCredentials.forEach((credential: any) => {
      credential.id = SecurityUtils.convertBase64ToArrayBuffer(credential.id);
    });
    return navigator['credentials']
      .get({
        publicKey: data,
      })
      .then((credential) => {
        return this.formatCredential(credential);
      })
      .catch((_) => {
        return {
          errorMessage: this.translate.instant('WEB_AUTHN.ERROR.NOT_ALLOWED'),
          success: false,
        };
      });
  }

  private async authenticateCredential(credential: any): Promise<any> {
    const data: any = credential;
    return this.getUserData()
      .then((userInfo) => {
        data.id = userInfo.id;
        data.idType = userInfo.idType;
        return this.http
          .post<any>(
            environment.api.base + environment.api.services.web_authn.auth,
            data,
          )
          .toPromise();
      })
      .catch((error) => {
        return {
          errorMessage: this.translate.instant('WEB_AUTHN.ERROR.UNEXPECTED'),
          success: false,
        };
      });
  }

  private formatCredential(credential: any): any {
    const data: any = {};
    data.publicKeyCredential = {};
    data.publicKeyCredential.id = credential['id'];
    data.publicKeyCredential.type = credential['type'];
    data.publicKeyCredential.rawId = SecurityUtils.convertArrayBufferToBase64(
      credential['rawId'],
    );
    data.publicKeyCredential.response = {};
    data.publicKeyCredential.response.authenticatorData = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].authenticatorData,
    );
    data.publicKeyCredential.response.clientDataJSON = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].clientDataJSON,
    );
    data.publicKeyCredential.response.signature = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].signature,
    );
    data.publicKeyCredential.response.userHandle = SecurityUtils.convertArrayBufferToBase64(
      credential['response'].userHandle,
    );
    data.success = true;
    return data;
  }

  public async authenticate(): Promise<any> {
    return this.getInitAuthData()
      .then((data) => {
        if (!data.success) {
          return data;
        }
        return this.getCredential(data).then((credential) => {
          return this.authenticateCredential(credential)
            .then((authenticateResponse) => {
              return authenticateResponse;
            })
            .catch((error) => {
              return {
                errorMessage: this.translate.instant('WEB_AUTHN.ERROR.NETWORK'),
                success: false,
              };
            });
        });
      })
      .catch((error) => {
        return {
          errorMessage: this.translate.instant('WEB_AUTHN.ERROR.NETWORK'),
          success: false,
        };
      });
  }

  public async getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.model.rememberUserInfo$
        .pipe(
          map((userInfoOnStore) => {
            if (isNullOrUndefined(userInfoOnStore)) {
              reject();
            } else {
              const userInfo: any = JSON.parse(atob(userInfoOnStore));
              resolve({
                id: userInfo.number,
                idType: userInfo.type,
              });
            }
          }),
        )
        .subscribe();
    });
  }
}
