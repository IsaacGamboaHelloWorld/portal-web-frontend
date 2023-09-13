import { combineReducers } from '@ngrx/store';

import { CertificateReducer as certificate } from './certificate.reducers';
import { ExtractsPeriodsReducer as periods } from './extracts-periods.reducers';
import { ExtractsReducer as extracts } from './extracts.reducers';
import { TributaryGmfReducer as tributaryGmf } from './tributary-gmf.reducers';
import { TributaryIncomeTaxTCReducer as tributaryIncomeTaxTC } from './tributary-income-tc.reducers';
import { TributaryRetentionReducer as tributaryIncome } from './tributary-retention.reducers';

export const DocumentsRootReducer = combineReducers({
  tributaryGmf,
  tributaryIncome,
  tributaryIncomeTaxTC,
  certificate,
  extracts,
  periods,
});
