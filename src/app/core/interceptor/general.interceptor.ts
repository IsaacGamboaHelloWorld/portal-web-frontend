import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CURRENT_USER } from '@core/constants/auth';
import {
  URLS_ENCRYPTS,
  URLS_NO_SESSION,
  URLS_SECURITY_HEADERS,
} from '@core/constants/services.constant';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as utf8 from 'utf8';
import { isNullOrUndefined } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { ManipulateDomService } from './../services/manipulate-dom/manipulate-dom.service';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  private modalIsOpen: boolean = false;

  constructor(
    private auth: AuthService,
    private securityService: SecurityService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dom: ManipulateDomService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    if (
      !isNullOrUndefined(this.tracing_session()) &&
      !this._findValue(request.url, URLS_NO_SESSION)
    ) {
      request = request.clone({
        headers: request.headers.set('X-SESSION-ID', this.tracing_session()),
      });
    }
    if (this.auth.isAuth && !request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.securityService.getItem(CURRENT_USER),
        ),
      });
    }
    if (
      (this._findValue(request.url, URLS_SECURITY_HEADERS) ||
        this._findValue(request.url, URLS_ENCRYPTS)) &&
      this.securityService.hasKeys
    ) {
      request = request.clone({
        headers: request.headers.set(
          'X-SECURITY-SESSION',
          this.securityService.symmetric.id,
        ),
      });
      return from(this.securityService.encryptAesGcm(uuidv4())).pipe(
        switchMap((requestId: string) => {
          request = request.clone({
            headers: request.headers.set('X-SECURITY-REQUEST-ID', requestId),
          });
          if (this._findValue(request.url, URLS_ENCRYPTS)) {
            return this.aesGcm(request, next);
          } else {
            return next.handle(request).pipe(this._handlingError());
          }
        }),
      );
    }
    return next.handle(request).pipe(this._handlingError());
  }

  private aesGcm(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    const body: string = !isNullOrUndefined(request.body)
      ? JSON.stringify(request.body)
      : '';
    const body_utf8: string = utf8.encode(body);
    const hmac: string = this.securityService.hmac(
      request.method.toLowerCase() + body,
    );
    return from(this.securityService.encryptAesGcm(body_utf8)).pipe(
      switchMap((encrypt: string) => {
        request = request.clone({
          headers: request.headers.set('X-SECURITY-HMAC', hmac),
          responseType: 'text',
          body: encrypt,
        });
        return next.handle(request).pipe(
          switchMap(async (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              let _body = '';
              if (!isNullOrUndefined(event.body) && event.body !== '') {
                _body = await this.securityService.decryptAesGcm(
                  event.body as string,
                );
              }
              return event.clone({
                body: _body !== '' ? JSON.parse(utf8.decode(_body)) : _body,
              });
            }
          }),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.auth.isAuth) {
            this.auth.logOut();
          }
        } else if (error.status === 403) {
          this.auth.logOut();
          if (!this.modalIsOpen) {
            this.modalIsOpen = true;
            setTimeout(() => this._openModalChannelBlocked(), 3000);
          }
        }
        return from(
          this.securityService.decryptAesGcm(
            !isNullOrUndefined(error) ? error.error : '',
          ),
        ).pipe(
          map((err: string) => {
            throw new HttpErrorResponse({
              error:
                !isNullOrUndefined(err) && err !== ''
                  ? JSON.parse(utf8.decode(err))
                  : '',
            }).error;
          }),
          catchError((decryptError) => {
            if (
              isNullOrUndefined(decryptError) ||
              decryptError.constructor.name === SyntaxError.name
            ) {
              return this._errorsTranslate(error);
            }
            throw decryptError;
          }),
        );
      }),
    );
  }

  private _findValue(url: string, urls_encrypt: string[]): boolean {
    return urls_encrypt.some((data) => url.endsWith(data));
  }

  private _handlingError(): any {
    return catchError((error: HttpErrorResponse) => {
      return this._errorsTranslate(error);
    });
  }

  private _errorsTranslate(error: HttpErrorResponse): Observable<string> {
    return this.translate.get('ERROR_HTTP').pipe(
      map((data) => {
        let statusMessage = data['GLOBAL'];
        if (
          !isNullOrUndefined(error) &&
          !isNullOrUndefined(error.status) &&
          !isNullOrUndefined(data[error.status.toString()])
        ) {
          statusMessage = data[error.status.toString()];
        }
        throw new HttpErrorResponse({
          error: statusMessage,
        }).error;
      }),
    );
  }

  private tracing_session(): string {
    try {
      return document.cookie
        .split('_dd_s')[1]
        .split('id=')[1]
        .split('&')[0];
    } catch (e) {}
  }

  private _openModalChannelBlocked(): void {
    this.modalIsOpen = true;
    const modal = this.modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
    const sub = modal.afterClosed.subscribe((_) => {
      this.modalIsOpen = false;
      this.modalService.disableClose = false;
      sub.unsubscribe();
    });
  }

  public _actionsModal(): void {
    this.modalService.disableClose = true;
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      this._setupDomModal();
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this.translate.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_SUCCESS.TITLE`,
      );
      component.subtitle = this.translate.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_SUCCESS.MAIN_DESCRIPTION`,
      );
      component.description = null;
      component.btnAgree = this.translate.instant(
        `SECURITY.ACCESS_CONTROL.MODAL_SUCCESS.OK_BUTTON`,
      );
      component.btnCancel = null;

      const subs = component.actionAgree.subscribe(() => {
        this.modalIsOpen = false;
        this.modalService.disableClose = false;
        this.modalService.close();
        subs.unsubscribe();
      });
    }
  }

  private _setupDomModal(): void {
    this.dom.addClass('.ds-modal-container', 'ac-home-container');
  }
}
