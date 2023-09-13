import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISavedAgreement } from '../reducers/save-agreement.reducer';
import { ICompaniesSearch } from '../reducers/search-companies.reducer';
import { IActiveCompany } from '../reducers/select-active-company.reducer';

import {
  EnrollServiceFeatureName,
  EnrollServiceModuleState,
} from '../state/enroll-module.state';
export const EnrollRootSelector = createFeatureSelector<
  EnrollServiceModuleState
>(EnrollServiceFeatureName);

export const getAllCompaniesState = createSelector(
  EnrollRootSelector,
  (state: EnrollServiceModuleState) => state.companies,
);

export const selectAllCompanies = createSelector(
  getAllCompaniesState,
  (state: ICompaniesSearch) => state,
);

export const getActiveCompanyState = createSelector(
  EnrollRootSelector,
  (state: EnrollServiceModuleState) => state.companyActive,
);

export const selectActiveCompany = createSelector(
  getActiveCompanyState,
  (state: IActiveCompany) => state,
);

export const getSaveAgreementState = createSelector(
  EnrollRootSelector,
  (state: EnrollServiceModuleState) => state.serviceSaved,
);

export const selectSavedAgreement = createSelector(
  getSaveAgreementState,
  (state: ISavedAgreement) => state,
);
