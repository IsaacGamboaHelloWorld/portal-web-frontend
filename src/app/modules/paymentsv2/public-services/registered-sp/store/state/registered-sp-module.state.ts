export const RegisteredPublicServiceFeatureName =
  'RegisteredPublicServiceModuleState';

export type RegisteredPublicServiceModuleState = Readonly<{
  infoPayments: IInfoPayments;
}>;

export interface IInfoPayments {
  billWithError: boolean;
  billWithErrorMessage: string;
  isBill: boolean;
}
