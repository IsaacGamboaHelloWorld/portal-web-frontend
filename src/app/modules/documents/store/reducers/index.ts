import { combineReducers } from '@ngrx/store';

import { CertificateReducer as certificate } from './certificate.reducers';
import {
  ExtractsPeriodsReducer as periods,
  ExtractsReducer as extracts,
} from './extracts.reducers';
import {
  TributaryIncomeRacReducer as tributaryRac,
  TributaryIncomeReducer as tributaryIncome,
  TributaryIncomeTaxTCReducer as tributaryIncomeTaxTC,
  TributaryReducer as tributary,
} from './tributary.reducers';

export const DocumentsRootReducer = combineReducers({
  tributary,
  tributaryIncome,
  tributaryIncomeTaxTC,
  tributaryRac,
  certificate,
  extracts,
  periods,
});
