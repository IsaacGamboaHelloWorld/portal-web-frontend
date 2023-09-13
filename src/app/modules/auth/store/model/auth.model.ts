import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { DataUser } from '@core/interfaces/dataUser.interface';
import { select } from '@ngrx/store';
import {
  FingerprintLoginAction,
  LoginAction,
  LoginResetAction,
  RememberUserAction,
} from '@store/actions/global/auth/auth.action';
import { Observable } from 'rxjs';

@Injectable()
export class AuthModel extends ApplicationModel {
  public isLoadingLogin$: Observable<boolean> = this.store.pipe(
    select((store) => store.global.user.loading),
  );

  public isErrorLogin$: Observable<boolean> = this.store.pipe(
    select((store) => store.global.user.error),
  );

  public fetchUser(user: DataUser, typelogin?: string): void {
    this.store.dispatch(LoginAction(user, typelogin));
  }

  public resetUser(): void {
    this.store.dispatch(LoginResetAction());
  }

  public rememberUser(userInfo: string): void {
    this.store.dispatch(RememberUserAction(userInfo));
  }

  public fetchFingerPrint(user: any): void {
    this.store.dispatch(FingerprintLoginAction(user));
  }
}
