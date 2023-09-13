import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { ValidatePingService } from '@core/services/validate-ping.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as ping from '@store/actions/global/auth/auth-validate-ping.action';
import * as session from '@store/actions/global/auth/auth-validate-session.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class ValidateSessionEffects {
  constructor(
    private actions$: Actions,
    private securityService: SecurityService,
    private validatePing: ValidatePingService,
    private auth: AuthService,
    private globalData: GlobalDataService,
  ) {}

  ValidateSession: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(session.ValidateSession),
      switchMap((action) => {
        return this.securityService.validateKey().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map(() => session.SessionSuccess()),
          catchError(() => {
            this.auth.logOut();
            return of(session.SessionFail());
          }),
        );
      }),
    );
  });

  ValidatePing: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ping.ValidatePing),
      switchMap(() => {
        return this.validatePing.validatePing().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map(() => ping.PingSuccess()),
          catchError(() => {
            this.auth.logOut();
            return of(ping.PingFail());
          }),
        );
      }),
    );
  });
}
