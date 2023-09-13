import { combineReducers } from '@ngrx/store';

import { saveAgreementReducer as serviceSaved } from './save-agreement.reducer';
import { companiesSearchReducer as companies } from './search-companies.reducer';
import { companyActiveReducer as companyActive } from './select-active-company.reducer';

export const EnrollServiceRootReducer = combineReducers({
  companies,
  companyActive,
  serviceSaved,
});
