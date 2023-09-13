import { combineReducers } from '@ngrx/store';
import { customerProfileCatalogReducer as catalogs } from './load-catalog.reducers';
import { customerProfileUpdateReducer as updateProfile } from './update-profile.reducers';

export const CustomerProfileReducers = combineReducers({
  catalogs,
  updateProfile,
});
