import { combineReducers } from '@ngrx/store';

import { categoriesEPocketReducer as categories } from './categories.reducer';
import { deletePocketReducer as deletePocket } from './delete-pocket.reducer';
import { editPocketReducer as editPocket } from './edit-pocket.reducer';

export const EditPocketRootReducer = combineReducers({
  categories,
  deletePocket,
  editPocket,
});
