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
  ILimitManagementCreateRequest,
  ILimitManagementGetRequest,
} from '../../entities';
import {
  LimitManagementCreateLoadAction,
  LimitManagementCreateResetAction,
  LimitManagementGetLoadAction,
  LimitManagementGetResetAction,
} from '../actions';
import {
  LimitManagementCreateSelector,
  LimitManagementGetSelector,
} from '../selectors';
import {
  ILimitManagementCreate,
  ILimitManagementGet,
} from '../state/limit-management.state';

@Injectable()
export class LimitManagementModel {
  constructor(protected store: Store<ApplicationState>) {}

  public limitManagementCreate$: Observable<
    ILimitManagementCreate
  > = this.store.pipe(select(LimitManagementCreateSelector));

  public limitManagementGet$: Observable<ILimitManagementGet> = this.store.pipe(
    select(LimitManagementGetSelector),
  );

  //#region "Create"
  public limitManagementCreateLoad(body: ILimitManagementCreateRequest): void {
    this.store.dispatch(LimitManagementCreateLoadAction({ body }));
  }

  public limitManagementCreateReset(): void {
    this.store.dispatch(LimitManagementCreateResetAction());
  }
  //#endregion "Create"

  //#region "Get"
  public limitManagementGetLoad(body: ILimitManagementGetRequest): void {
    this.store.dispatch(LimitManagementGetLoadAction({ body }));
  }

  public limitManagementGetReset(): void {
    this.store.dispatch(LimitManagementGetResetAction());
  }
  //#endregion "Get"

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
