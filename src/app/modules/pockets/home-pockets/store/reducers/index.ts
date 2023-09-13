import { combineReducers } from '@ngrx/store';

import { pocketActiveReducer as activePocket } from './active-pocket.reducer';
import { detailPocketReducer as detailPocket } from './get-pocket.reducer';
import { homePocketsReducer as homePockets } from './get-pockets.reducer';
import { loadPrefReducer as loadPref } from './load-prefs.reducer';
import { savePrefReducer as savePref } from './save-prefs.reducer';
import { updatePocketReducer as updatePocket } from './update-pockets.reducer';

export const HomePocketsRootReducer = combineReducers({
  homePockets,
  activePocket,
  savePref,
  loadPref,
  updatePocket,
});

export const DetailPocketRootReducer = combineReducers({
  detailPocket,
});

export const ActivePocketRootReducer = combineReducers({
  activePocket,
});
