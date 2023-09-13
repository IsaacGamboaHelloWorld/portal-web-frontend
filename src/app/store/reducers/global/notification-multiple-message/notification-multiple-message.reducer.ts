import * as fromNotification from '@store/actions/global/notification-multiple-message/notification-multiple-message.action';

export interface INotificationMMState {
  dataMessage: any;
  open: boolean;
  typeNotification: string;
  firstMessage: boolean;
  overwriteMessage: string;
}

export const initNotificationMM: INotificationMMState = {
  dataMessage: null,
  open: false,
  typeNotification: '',
  firstMessage: true,
  overwriteMessage: '',
};

export function notificationMMReducer(
  state: INotificationMMState,
  action: fromNotification.actions,
): INotificationMMState {
  switch (action.type) {
    case fromNotification.NOTIFICATION_MM_SHOW:
      const actionNotification = action as fromNotification.NotificationMMShowAction;

      return {
        dataMessage: actionNotification.dataMessage,
        open: true,
        typeNotification: actionNotification.typeNotification,
        firstMessage: actionNotification.firstMessage,
        overwriteMessage: actionNotification.overwriteMessage,
      };
    case fromNotification.NOTIFICATION_MM_CLOSED:
      return {
        ...state,
        open: false,
      };

    case fromNotification.NOTIFICATION_MM_RESET:
      return initNotificationMM;

    default:
      return state;
  }
}
