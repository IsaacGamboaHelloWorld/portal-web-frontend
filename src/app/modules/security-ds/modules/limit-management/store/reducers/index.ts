import { combineReducers } from '@ngrx/store';
import { limitManagementCreateReducer as create } from './limit-management-create.reducers';
import { limitManagementGetReducer as get } from './limit-management-get.reducers';

export const limitManagementRootReducer = combineReducers({
  get,
  create,
});

export * from './limit-management-create.reducers';
export * from './limit-management-get.reducers';
