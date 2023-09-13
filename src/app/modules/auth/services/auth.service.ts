import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { from, Observable, of, race, Subject } from 'rxjs';
import { delay, switchMap, take, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { clearProducts } from '@app/shared/helpers/eventDataLayer';
import { CURRENT_USER, TIME_SYMMETRIC } from '@core/constants/auth';
import { Navigate } from '@core/constants/navigate';
import { UserData } from '@core/models/user/userData';
import { AuthSession } from '@core/services/auth-session';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { environment } from '@environment';
import {
  GetPublicKeyResponse,
  SecurityService,
} from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { TranslateService } from '@ngx-translate/core';
import { AuthModel } from '../store/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _userActionOccured: Subject<void> = new Subject();
  private _serverPublicKey: string;
  private _sensitiveFields: string[] = [
    'currentPassword',
    'secureDataSecret',
    'universalPassword',
    'universalPasswordConfirmation',
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private model: AuthModel,
    private securityService: SecurityService,
    private securityUtil: Security,
    private globalData: GlobalDataService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private authStorage: AuthSession,
    private translate: TranslateService,
  ) {}

  get isAuth(): boolean {
    return !isNullOrUndefined(this.securityService.getItem(CURRENT_USER));
  }

  public doLogin(_userData: any): Observable<UserData> {
    // TODO: Consumo Experian Ambientes Bajos
    _userData['flowName'] = 'GB_PB_EVIDENTE_OTP_MASTER';
    // Enrollment Normal
    // _userData['flowName'] = 'GB_PB';
    return from(this.getServerPublicKey()).pipe(
      switchMap(() => {
        if (!isNullOrUndefined(_userData.content)) {
          for (const sensitiveField of this._sensitiveFields) {
            const value = _userData.content[sensitiveField];
            if (!isNullOrUndefined(value)) {
              _userData.content[
                sensitiveField
              ] = this.securityUtil.encryptRsaPkcs1String(
                value,
                this._serverPublicKey,
              ) as string;
            }
          }
        }
        return of(_userData);
      }),
      switchMap((user: UserData) => {
        const timeout = of('Timeout').pipe(
          delay(5000),
          switchMap(() => {
            throw this.translate.instant('RECAPTCHA.LOAD_ERROR');
          }),
        );
        const recaptcha = this.reCaptchaV3Service.execute('login');
        return race(recaptcha, timeout).pipe(
          switchMap((token) => {
            if (!isNullOrUndefined(token)) {
              const httpOptions = {
                headers: new HttpHeaders({
                  'X-SECURITY-RECAPTCHA': token,
                  'Content-Type': 'application/json;charset=UTF-8',
                }),
              };
              return this.http.post<UserData>(
                environment.api.base + environment.api.services.login,
                user,
                httpOptions,
              );
            } else {
              return of({
                errorMessage: this.translate.instant('RECAPTCHA.LOAD_ERROR'),
                success: false,
              });
            }
          }),
        );
      }),
      tap((user: UserData) => {
        if (UserData.loginSuccess(user)) {
          this.authStorage.saveTokenData(user.token);
          this.saveTimeSymmetric();
          this.model.setIsLogged(true);
        }
      }),
    );
  }

  public saveUser(token: string): void {
    this.securityService.setItem(CURRENT_USER, token);
  }

  public saveTimeSymmetric(): void {
    this.securityService.setItem(
      TIME_SYMMETRIC,
      JSON.stringify({
        time: this.securityService.timeSymmetric,
        date: new Date().getTime(),
      }),
    );
  }

  public logOut(): void {
    this._logoutService();
    setTimeout(() => {
      this.securityService.deleteKey();
      this.globalData.cancelRequest();
      this.removeUser();
      clearProducts();
      this.model.logout();
      this.router.navigate([Navigate.login]);
    }, 250);
  }
  public singlelogOut(): void {
    const hmacDelete: string = this.securityService.hmac('delete' + '');
    fetch(environment.api.base + environment.api.services.logout, {
      method: 'delete',
      headers: {
        'X-SESSION-ID': this.tracing_session(),
        // tslint:disable-next-line: prettier
        'Authorization': 'Bearer ' + this.securityService.getItem(CURRENT_USER),
        'X-SECURITY-SESSION': this.securityService.symmetric.id,
        'X-SECURITY-HMAC': hmacDelete,
      },
      body: '',
      keepalive: true, // this is important!
    });
  }

  private tracing_session(): string {
    try {
      return document.cookie
        .split('_dd_s')[1]
        .split('id=')[1]
        .split('&')[0];
    } catch (e) {}
  }

  get userActionOccured(): Observable<void> {
    return this._userActionOccured.asObservable();
  }

  public notifyUserAction(): void {
    this._userActionOccured.next();
  }

  public removeUser(): void {
    this.securityService.clear();
  }

  private _logoutService(): void {
    this.http
      .delete(environment.api.base + environment.api.services.logout)
      .pipe(take(1))
      .subscribe();
  }

  public async getServerPublicKey(): Promise<void> {
    if (isNullOrUndefined(this._serverPublicKey)) {
      const url =
        environment.api.base +
        environment.api.services.getEnrollmentServerPublicKey;
      const response = await this.http
        .get<GetPublicKeyResponse>(url)
        .toPromise();
      this._serverPublicKey = response.publicKey;
    }
  }
}
