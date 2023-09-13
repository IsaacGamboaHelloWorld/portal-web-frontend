import { ISavedAgreement } from '../reducers/save-agreement.reducer';
import { ICompaniesSearch } from '../reducers/search-companies.reducer';
import { IActiveCompany } from '../reducers/select-active-company.reducer';

export const EnrollServiceFeatureName = 'EnrollServiceModuleState';

export type EnrollServiceModuleState = Readonly<{
  companies: ICompaniesSearch;
  companyActive: IActiveCompany;
  serviceSaved: ISavedAgreement;
}>;
