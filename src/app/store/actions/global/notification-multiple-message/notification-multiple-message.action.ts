import { Action } from '@ngrx/store';

export const NOTIFICATION_MM_SHOW = '[GLOBAL] Show Notification MM';
export const NOTIFICATION_MM_CLOSED = '[GLOBAL] Closed Notification MM';
export const NOTIFICATION_MM_RESET = '[GLOBAL] Reset Notification MM';

export class NotificationMMShowAction implements Action {
  readonly type: string = NOTIFICATION_MM_SHOW;

  constructor(
    public dataMessage: any,
    public open: boolean,
    public typeNotification: string,
    public firstMessage: boolean,
    public overwriteMessage: string,
  ) {}
}

export class NotificationMMClosedAction implements Action {
  readonly type: string = NOTIFICATION_MM_CLOSED;
}

export class NotificationMMResetAction implements Action {
  readonly type: string = NOTIFICATION_MM_RESET;
}

export type actions =
  | NotificationMMShowAction
  | NotificationMMClosedAction
  | NotificationMMResetAction;
