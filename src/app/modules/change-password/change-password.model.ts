import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { ChangePasswordAction } from '@app/store/actions/global/auth/change-password.action';
import {
  smsFailActions,
  smsSendActions,
} from '@app/store/actions/global/auth/notification-sms.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  public isLoadingChangePasswordCommand$: Observable<boolean> = this.store.pipe(
    select((store) => store.global.changePassword.loading),
  );

  public changePassword(data: any): void {
    this.store.dispatch(ChangePasswordAction(data));
  }

  public sendNotificationSms(): void {
    this.store.dispatch(smsSendActions());
  }

  public failNotificationSms(message: string): void {
    this.store.dispatch(smsFailActions({ message }));
  }
}
