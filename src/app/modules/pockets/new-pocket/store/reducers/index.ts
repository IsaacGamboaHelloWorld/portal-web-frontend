import { combineReducers } from '@ngrx/store';

import { categoriesPocketReducer as categories } from './categories.reducer';
import { newPocketStepOneReducer as formOne } from './formOneStep.reducer';
import { newPocketStepThreeReducer as formThree } from './formThreeStep.reducer';
import { newPocketStepTwoReducer as formTwo } from './formTwoStep.reducer';
import { savePocketReducer as returnedInfo } from './newPocket.reducer';

export const NewPocketRootReducer = combineReducers({
  categories,
  formOne,
  formTwo,
  formThree,
  returnedInfo,
});
