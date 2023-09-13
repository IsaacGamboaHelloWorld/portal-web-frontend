import { createReducer, on } from '@ngrx/store';
import { ISetPayment } from '../../entities/public-services';
import * as fromSet from '../actions/set-to-payment.action';

export const initSetPublicServicePayments: ISetPayment = {
  payData: null,
};
export const setPaymentReducer = createReducer(
  initSetPublicServicePayments,
  on(fromSet.SetPublicServicesPaymentsLoad, (state, { payData }) => {
    return {
      payData,
    };
  }),
  on(fromSet.SetPublicServicesPaymentsReset, () => {
    return initSetPublicServicePayments;
  }),
);
