import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { BIOMETRIC, STATE_BIOMETRIC } from '@app/core/constants/auth';
import { UserData } from '@app/core/models/user/userData';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
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
import { ModalAlertsComponent } from '../../components/enrollment/components/modal-alerts/modal-alerts.component';
import { STEPS } from '../../constants/steps';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../model/auth.model';
import { AbstractAuthEffects } from './abstract-auth.effects';

@Injectable()
export class AuthEffects extends AbstractAuthEffects {
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.modelAuth.enrollmentData$;
  public registerForm: FormGroup;
  public stateBiometric: string = 'GET';

  constructor(
    private actions$: Actions,
    private loginService: AuthService,
    protected router: Router,
    protected model: ApplicationModel,
    protected events: EventsService,
    public tealium: TealiumUtagService,
    private fingerprintService: WebAuthnService,
    private modelAuth: AuthModel,
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
              this.successRedirect(action.typelogin);
              return LoginSuccessAction(user);
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
            switch (user.step) {
              case '':
                user.step = STEPS.SERVICE_ERROR;
                this.timerRedirect(Navigate.enrollment);
                break;
              case STEPS.USER_CONFIRM_FROM_EXPERIAN_ERROR:
                user.step = STEPS.USER_CONFIRM_FROM_EXPERIAN_ERROR;
                this.showModal();
                break;
              case STEPS.USER_CONFIRM_FROM_PIN_ERROR:
                user.step = STEPS.USER_CONFIRM_FROM_PIN_ERROR;
                this.showModal();
                break;
              case STEPS.PROCESS_WEBAUTHN_FLOW:
                if (user.success && action.typelogin) {
                  this.startBiometric(user, action.typelogin);
                }
                break;
              default:
                this.timerRedirect(Navigate.enrollment);
                break;
            }
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

  public startBiometric(user: UserData, typelogin: string): void {
    if (localStorage.getItem(BIOMETRIC)) {
      localStorage.removeItem(BIOMETRIC);
    }
    this.fingerprintService.getInitAuthData().then((init) => {
      this.stateBiometric = !init.success ? 'REGISTER' : 'GET';
      const unEnroll = this.enrollmentData$.subscribe((enroll) => {
        if (enroll && enroll.data['processId']) {
          enroll.data.step = !init.success
            ? STEPS.FILL_LOGIN_CREDENTIALS
            : STEPS.FILL_LOGIN_CREDENTIALS_BIOMETRIC_I;
        }
      });
      this.timerRedirect(Navigate.enrollment);
      unEnroll.unsubscribe();
      return init;
    });
  }

  public showModal(): void {
    this.modalService.open(
      ModalAlertsComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
  }
}
