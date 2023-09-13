import { combineReducers } from '@ngrx/store';
import { CudAccessControlReducer as cudStatusChannel } from './cud-access-control.reducers';
import { GetAccessControlReducer as statusChannel } from './get-access-control.reducers';

export const AccessControlRoot = combineReducers({
  statusChannel,
  cudStatusChannel,
});
