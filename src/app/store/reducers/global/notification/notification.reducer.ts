import * as fromNotification from '@store/actions/global/notification/notification.action';

export interface INotificationState {
  message: string;
  subMessage: string;
  autoClosed: boolean;
  open: boolean;
  hideClose: boolean;
  typeNotification: string;
}

export const initNotification: INotificationState = {
  message: '',
  subMessage: '',
  autoClosed: false,
  open: false,
  hideClose: false,
  typeNotification: '',
};

export function notificationReducer(
  state: INotificationState,
  action: fromNotification.actions,
): INotificationState {
  switch (action.type) {
    case fromNotification.NOTIFICATION_SHOW:
      const actionNotification = action as fromNotification.NotificationShowAction;

      return {
        message: actionNotification.message,
        subMessage: actionNotification.subMessage,
        autoClosed: actionNotification.autoClosed,
        open: true,
        hideClose: actionNotification.hideClose,
        typeNotification: actionNotification.typeNotification,
      };
    case fromNotification.NOTIFICATION_CLOSED:
      return {
        ...state,
        open: false,
      };

    case fromNotification.NOTIFICATION_RESET:
      return initNotification;

    default:
      return state;
  }
}
