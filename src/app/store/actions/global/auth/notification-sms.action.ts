import { createAction, props } from '@ngrx/store';

enum TYPE_ACTION {
  SMS_SEND = '[Notification SMS] Send',
  SMS_SUCCESS = '[Notification SMS] Success',
  SMS_FAIL = '[Notification SMS] Fail',
  SMS_RESET = '[Notification SMS] Reset',
}

export const smsSendActions = createAction(TYPE_ACTION.SMS_SEND);
export const smsSuccessActions = createAction(TYPE_ACTION.SMS_SUCCESS);
export const smsFailActions = createAction(
  TYPE_ACTION.SMS_FAIL,
  props<{ message: string }>(),
);
export const smsResetActions = createAction(TYPE_ACTION.SMS_RESET);
