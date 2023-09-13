import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TwoFactorAuthService } from '../twofactorauth.service';

@Injectable()
export class TwoFactorAuthInterceptor implements HttpInterceptor {
  constructor(private service: TwoFactorAuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      switchMap((httpEvent: HttpEvent<any>) => {
        if (this.service.isTwoFactorAuthResponse(httpEvent)) {
          this.service.processResponse(httpEvent as HttpResponse<any>);
          return this.service.resolver(httpEvent);
        }
        return of(httpEvent);
      }),
    );
  }
}
