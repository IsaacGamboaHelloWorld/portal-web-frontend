import { createReducer, on } from '@ngrx/store';
import { ICompanyListResponse } from '../../entities/enroll';
import * as fromSearch from '../actions/search-companies.action';

export interface ICompaniesSearch {
  data: ICompanyListResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCompaniesSearch: ICompaniesSearch = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
};

export const companiesSearchReducer = createReducer(
  initCompaniesSearch,
  on(fromSearch.SearchCompanyLoadAction, (state) => {
    return {
      data: null,
      loaded: false,
      loading: true,
      error: false,
    };
  }),
  on(fromSearch.SearchCompanyFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
      loaded: false,
      loading: false,
      error: true,
    };
  }),
  on(fromSearch.SearchCompanySuccessAction, (state, { companies }) => {
    return {
      data: companies,
      loading: false,
      loaded: true,
      error: false,
    };
  }),
  on(fromSearch.SearchCompanyResetAction, (state) => {
    return initCompaniesSearch;
  }),
);
