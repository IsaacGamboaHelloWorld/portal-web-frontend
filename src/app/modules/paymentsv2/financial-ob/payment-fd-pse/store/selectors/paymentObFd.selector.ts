import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IPaymentObFreeDestiantionState,
  paymentObFreeDestiantionFeatureKey,
} from '../state/payment-fd-pse.state';

export const paymentObFreeDestiantionRoot = createFeatureSelector<
  IPaymentObFreeDestiantionState
>(paymentObFreeDestiantionFeatureKey);

export const selectStep = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.lineTime.step,
);

export const selectFormOne = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.formOne,
);

export const selectFormTwo = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.formTwo,
);

export const selectFormThree = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.formThree,
);

export const selectBanksData = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.banks,
);

export const selectBanks = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.banks.banks,
);

export const selectInitPaymentPse = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.initPayment,
);

export const selectStatusPaymentPse = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.statusPayment,
);

export const selectStatusPaymentDataPse = createSelector(
  paymentObFreeDestiantionRoot,
  (state: IPaymentObFreeDestiantionState) => state.statusPayment.data,
);
