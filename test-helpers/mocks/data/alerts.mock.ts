import {
  ICreateUserAlertResponse,
  ISearchUserAlertsResponse,
} from '@app/modules/alerts/entities/alerts';

export const SearchUserAlertsMock: ISearchUserAlertsResponse = {
  success: true,
  alerts: [
    {
      id: '1',
      key: '',
      name: '',
      group: '',
      groupName: '',
      daysBefore: ',',
    },
  ],
  errorMessage: '',
};

export const CreateUserAlertV1Mock: ICreateUserAlertResponse = {
  success: 'true',
};
