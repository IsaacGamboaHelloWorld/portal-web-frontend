import { createReducer, on } from '@ngrx/store';
import { IPublicService } from '../../entities/public-services';
import * as fromActive from '../actions/select-payment.action';

export interface IActivePublicServicePaymentPayments {
  activePayment: IPublicService;
}

export const initActivePublicServicePaymentPayments: IActivePublicServicePaymentPayments = {
  activePayment: null,
};
export const activePaymentReducer = createReducer(
  initActivePublicServicePaymentPayments,
  on(fromActive.SelectPaymentLoad, (state, { payment }) => {
    return {
      activePayment: payment,
    };
  }),
  on(fromActive.SelectPaymentReset, (state) => {
    return initActivePublicServicePaymentPayments;
  }),
);
