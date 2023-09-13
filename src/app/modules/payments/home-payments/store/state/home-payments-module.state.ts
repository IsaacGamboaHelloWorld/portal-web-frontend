import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';

export const HomePaymentFeatureName = 'HomePaymentModuleState';

export type HomePaymentModuleState = Readonly<{
  historicPayments: IHistoricPayments;
}>;
