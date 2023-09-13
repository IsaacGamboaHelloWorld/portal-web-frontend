import { combineReducers } from '@ngrx/store';
import { movementsFileReducer as movementsFileState } from './movements-file.reducer';
import {
  NicknamesAllReducer as nicknamesAll,
  NicknamesCreateReducer as nicknamesCreate,
  NicknamesDeleteReducer as nicknamesDelete,
  NicknamesUpdateReducer as nicknamesUpdate,
} from './nicknames.reducer';

export const DetailProductReducers = combineReducers({
  movementsFileState,
  nicknamesAll,
  nicknamesCreate,
  nicknamesDelete,
  nicknamesUpdate,
});
