import { IHistoricPayments } from '@app/modules/paymentsv2/choose-history/store/reducers/choose-history.reducer';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { Product } from '../../../../../core/models/products/product';
import { IDeleteLoanPayments } from '../reducers/delete-payment.reducer';
import { IAllFinancialOpPayments } from '../reducers/registered-bills.reducer';
import { IActiveFinancialOpPaymentPayments } from '../reducers/selected-payment.reducer';

export const FinancialOpFeatureName = 'FinancialOpModuleState';
export const GeneralFeatureName = 'models';

export type FinancialOpModuleState = Readonly<{
  allPayments: IAllFinancialOpPayments;
  activePayment: IActiveFinancialOpPaymentPayments;
  banks: IBanks;
  deletePayment: IDeleteLoanPayments;
  historyPayment: IHistoricPayments;
  step: StepLineTime;
  navigation: NavigationPaymentFlow;
}>;

export type GeneralAllState = Readonly<{
  product: Product[];
}>;

export interface StepLineTime {
  step: number;
}

export interface NavigationPaymentFlow {
  isFreeDestination: boolean;
}
