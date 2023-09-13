import { createReducer, on } from '@ngrx/store';
import { OtpAthModalClose, OtpAthModalOpen } from '../actions';
import { IOtpAthModal } from '../state/otp-auth.state';

export const initOtpAthModal: IOtpAthModal = {
  open: false,
  transactionType: null,
};

export const OtpAthModalReducer = createReducer(
  initOtpAthModal,
  on(OtpAthModalOpen, (state, { transactionType }) => {
    return {
      ...state,
      open: true,
      transactionType,
    };
  }),
  on(OtpAthModalClose, (state) => {
    return {
      ...state,
      open: false,
    };
  }),
);
