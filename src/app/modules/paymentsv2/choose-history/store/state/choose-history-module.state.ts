import { IHistoricPayments } from '../reducers/choose-history.reducer';
export const ChooseHistoryFeatureName = 'ChooseHistoryModuleState';

export type ChooseHistoryModuleState = Readonly<{
  historicPayments: IHistoricPayments;
}>;
