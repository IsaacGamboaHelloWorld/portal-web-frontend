import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/back-home.action';

export const initivalVal = false;

export const backHomeReducer = createReducer(
  initivalVal,
  on(fromActions.SetBackHome, (state, { come_back }) => {
    return come_back;
  }),
  on(fromActions.ResetBackHome, (state) => {
    return initivalVal;
  }),
);
