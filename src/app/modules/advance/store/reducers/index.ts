import { combineReducers } from '@ngrx/store';

import { formGlobalReducer as formGlobal } from '@modules/advance/store/reducers/form-global.reducer';
import { transferAdvanceReducer as transferAdvance } from '@modules/advance/store/reducers/transfer-advance.reducer';

export const AdvanceRootReducer = combineReducers({
  transferAdvance,
  formGlobal,
});
