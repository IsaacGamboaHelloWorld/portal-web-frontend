import { createReducer, on } from '@ngrx/store';
import { CompanyListInterface } from '../../../../../core/interfaces/paymentBills.interface';
import * as fromSearch from '../../../../actions/models/payment/payment-bills/search-company.action';

export interface CompaniesSearchState {
  data: CompanyListInterface;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCompaniesSearch: CompaniesSearchState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const companiesSearchReducer = createReducer(
  initCompaniesSearch,
  on(fromSearch.CompaniesBillLoadAction, (state) => {
    return {
      data: null,
      loaded: false,
      loading: true,
      error: false,
    };
  }),
  on(fromSearch.CompaniesBillFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
      loaded: false,
      loading: false,
      error: true,
    };
  }),
  on(fromSearch.CompaniesBillSuccessAction, (state, { companies }) => {
    return {
      data: companies,
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromSearch.CompaniesBillResetAction, (state) => {
    return initCompaniesSearch;
  }),
);
