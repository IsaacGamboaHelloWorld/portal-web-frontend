import { Injectable } from '@angular/core';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  TotpDeleteLoad,
  TotpDeleteReset,
} from '../actions/totp-delete.actions';
import {
  TotpDevicesLoad,
  TotpDevicesReset,
} from '../actions/totp-devices.actions';
import {
  TotpGenerateLoad,
  TotpGenerateReset,
} from '../actions/totp-generate.actions';
import {
  TotpRegisterLoad,
  TotpRegisterReset,
} from '../actions/totp-register.actions';
import {
  TotpDeleteSelector,
  TotpDevicesSelector,
  TotpGenerateSelector,
  TotpRegisterSelector,
} from '../selectors/totp.selectors';
import {
  ITotpDelete,
  ITotpDevices,
  ITotpGenerate,
  ITotpRegister,
} from '../state/totp.state';

@Injectable()
export class TotpModel {
  constructor(protected store: Store<ApplicationState>) {}

  public generateTotp$: Observable<ITotpGenerate> = this.store.pipe(
    select(TotpGenerateSelector),
  );

  public registerTotp$: Observable<ITotpRegister> = this.store.pipe(
    select(TotpRegisterSelector),
  );

  public devicesTotp$: Observable<ITotpDevices> = this.store.pipe(
    select(TotpDevicesSelector),
  );

  public deleteTotp$: Observable<ITotpDelete> = this.store.pipe(
    select(TotpDeleteSelector),
  );

  //#region "TotpGenerate"
  public totpGenerateLoad(): void {
    this.store.dispatch(TotpGenerateLoad());
  }

  public totpGenerateReset(): void {
    this.store.dispatch(TotpGenerateReset());
  }
  //#endregion "TotpGenerate"
  //#region "TotpRegister"
  public totpRegisterLoad(name: string, totpId: string, code: string): void {
    this.store.dispatch(TotpRegisterLoad({ name, totpId, code }));
  }

  public totpRegisterReset(): void {
    this.store.dispatch(TotpRegisterReset());
  }
  //#endregion "TotpRegister"
  //#region "TotpDevices"
  public totpDevicesLoad(): void {
    this.store.dispatch(TotpDevicesLoad());
  }

  public totpDevicesReset(): void {
    this.store.dispatch(TotpDevicesReset());
  }
  //#endregion "TotpDevices"

  //#region "TotpDelete"
  public totpDeleteLoad(totpId: string): void {
    this.store.dispatch(TotpDeleteLoad({ totpId }));
  }

  public totpDeleteReset(): void {
    this.store.dispatch(TotpDeleteReset());
  }
  //#endregion "TotpDelete"

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }

  public notificationReset(): void {
    this.store.dispatch(new NotificationResetAction());
  }
}
