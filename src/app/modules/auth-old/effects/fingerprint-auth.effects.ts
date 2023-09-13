import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { EventsService } from '@core/services/tag_manager/events.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  FingerprintLoginAction,
  LoginSuccessAction,
} from '@store/actions/global/auth/auth.action';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractAuthEffects } from './abstract-auth.effects';

@Injectable()
export class FingerprintAuthEffects extends AbstractAuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: AuthService,
    protected router: Router,
    protected model: ApplicationModel,
    protected events: EventsService,
  ) {
    super(router, model, events, null);
  }

  Login: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(FingerprintLoginAction),
      switchMap((action) => {
        return of(action.user).pipe(
          map((user) => {
            this.successRedirect();
            this.saveRemember();
            return LoginSuccessAction(user);
          }),
        );
      }),
    );
  });
}
