import { Product } from '@app/core/models/products/product';
import { ISetPayment } from '../../entities/public-services';
import { BillerDetailState } from '../reducers/biller-detail.reducer';
import { IDeletePublicServicePayments } from '../reducers/delete-payment.reducer';
import { EnabledAgreementsState } from '../reducers/enabled-agreements.reducer';
import { INextPublicServicesPayments } from '../reducers/next-payments.reducer';
import { IRecurringPaymentState } from '../reducers/recurring-payment.reducer';
import { IAllPublicServicesPayments } from '../reducers/registered-bills.reducer';
import { IActivePublicServicePaymentPayments } from '../reducers/selected-payment.reducer';
import { IEditRecurringState } from '../reducers/selected-recurring.reducer';

export const PublicServiceFeatureName = 'PublicServiceModuleState';
export const ProductsFeatureName = 'models';

export type PublicServiceModuleState = Readonly<{
  nextPayments: INextPublicServicesPayments;
  allPayments: IAllPublicServicesPayments;
  activePayment: IActivePublicServicePaymentPayments;
  deletePayment: IDeletePublicServicePayments;
  setPayment: ISetPayment;
  recurring: IRecurringPaymentState;
  deleteRecurring: IRecurringPaymentState;
  billerInfo: BillerDetailState;
  toEditRecurring: IEditRecurringState;
  enabledAgreementsOnPaymentSchedule: EnabledAgreementsState;
  step: StepLineTime;
}>;

export type ProductsModuleState = Readonly<{
  product: Product[];
}>;
export interface StepLineTime {
  step: number;
}
