import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { UserData } from '@app/core/models/user/userData';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { Navigate } from '@core/constants/navigate';
import { ClassNotification } from '@core/constants/notification';
import { EventsService } from '@core/services/tag_manager/events.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
// tslint:disable-next-line:no-duplicate-imports
import {
  LoginAction,
  LoginSuccessAction,
} from '@store/actions/global/auth/auth.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { STEPS } from '../constants/steps';
import { ModalAlertsComponent } from '../enrollment/components/modal-alerts/modal-alerts.component';
import { AbstractAuthEffects } from './abstract-auth.effects';

@Injectable()
export class AuthEffects extends AbstractAuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: AuthService,
    protected router: Router,
    protected model: ApplicationModel,
    protected events: EventsService,
    public tealium: TealiumUtagService,
    private modalService: ModalService,
  ) {
    super(router, model, events, null);
  }

  Login: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginAction),
      switchMap((action) => {
        return this.loginService.doLogin(action.dataUser).pipe(
          map((user: UserData) => {
            if (UserData.loginSuccess(user)) {
              this.saveRemember();
              this.successRedirect();
              return LoginSuccessAction(user);
            } else if (
              user.step === STEPS.USER_CONFIRM_FROM_EXPERIAN_ERROR ||
              user.step === STEPS.USER_CONFIRM_FROM_PIN_ERROR
            ) {
              this.modalService.open(
                ModalAlertsComponent,
                false,
                `${SMALL_WIDTH} not-button-close`,
              );
            } else {
              if (!user.success) {
                if (!UserData.isOnServiceErrorOrAnAllowedErrorStep(user)) {
                  this.model.notificationOpen(
                    user.errorMessage,
                    true,
                    ClassNotification.ERROR,
                  );
                }
              }
            }
            if ('' === user.step) {
              user.step = STEPS.SERVICE_ERROR;
            }
            this.timerRedirect(Navigate.enrollment);
            return LoginSuccessAction(user);
          }),
          catchError((err: any) => {
            const user: UserData = { step: STEPS.SERVICE_ERROR };
            return of(LoginSuccessAction(user));
          }),
        );
      }),
    );
  });
}
