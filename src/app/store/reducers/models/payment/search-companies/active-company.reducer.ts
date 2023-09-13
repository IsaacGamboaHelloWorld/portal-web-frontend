import { createReducer, on } from '@ngrx/store';
import { CompanyInterface } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromActive from '../../../../actions/models/payment/payment-bills/company-select.action';

export interface ActiveCompanyState {
  data: CompanyInterface;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCompanyActive: ActiveCompanyState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const companyActiveReducer = createReducer(
  initCompanyActive,
  on(fromActive.CompanyActiveSuccessAction, (state, { company }) => {
    return {
      data: company,
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromActive.CompanyActiveResetAction, (state) => {
    return initCompanyActive;
  }),
);
