import { Action } from '@ngrx/store';

export const NOTIFICATION_SHOW = '[GLOBAL] Show Notification';
export const NOTIFICATION_CLOSED = '[GLOBAL] Closed Notification';
export const NOTIFICATION_RESET = '[GLOBAL] Reset Notification';

export class NotificationShowAction implements Action {
  readonly type: string = NOTIFICATION_SHOW;

  constructor(
    public message: string,
    public autoClosed: boolean,
    public typeNotification: string,
    public hideClose: boolean = false,
    public subMessage: string = '',
  ) {}
}

export class NotificationClosedAction implements Action {
  readonly type: string = NOTIFICATION_CLOSED;
}

export class NotificationResetAction implements Action {
  readonly type: string = NOTIFICATION_RESET;
}

export type actions =
  | NotificationShowAction
  | NotificationClosedAction
  | NotificationResetAction;
