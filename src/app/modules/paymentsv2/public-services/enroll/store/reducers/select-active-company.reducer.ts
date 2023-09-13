import { createReducer, on } from '@ngrx/store';
import { ICompany } from '../../entities/enroll';
import * as fromActive from '../actions/select-active-company.action';

export interface IActiveCompany {
  data: ICompany;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCompanyActive: IActiveCompany = {
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
