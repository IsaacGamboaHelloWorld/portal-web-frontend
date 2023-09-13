import { createReducer, on } from '@ngrx/store';

import { IHomePocketsRecord } from '../../entities/home-pockets';
import * as fromLoad from '../actions/update-pockets.actions';

export const initUpdatePockets: IHomePocketsRecord = {
  loading: false,
  loaded: false,
  pocketId: '',
  pocketType: '',
  pocketName: '',
  savingGoal: '',
  amountPeriodicSavings: '',
  amountSaved: '',
  pendingAmount: '',
  category: '',
  pocketPeriod: '',
  pocketPeriodDescription: '',
};

export const updatePocketReducer = createReducer(
  initUpdatePockets,
  on(fromLoad.UpdatePocketsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      pocketId: '',
      pocketType: '',
      pocketName: '',
      savingGoal: '',
      amountPeriodicSavings: '',
      amountSaved: '',
      pendingAmount: '',
      category: '',
      pocketPeriod: '',
      pocketPeriodDescription: '',
    };
  }),
  on(fromLoad.UpdatePocketsSuccess, (state, { pockets }) => {
    return {
      loading: false,
      loaded: true,
      pocketId: pockets.pocketId,
      pocketType: pockets.pocketType,
      pocketName: pockets.pocketName,
      savingGoal: pockets.savingGoal,
      amountPeriodicSavings: pockets.amountPeriodicSavings,
      amountSaved: pockets.amountSaved,
      pendingAmount: pockets.pendingAmount,
      category: pockets.category,
      pocketPeriod: pockets.pocketPeriod,
      pocketPeriodDescription: pockets.pocketPeriodDescription,
    };
  }),
  on(fromLoad.UpdatePocketsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      errorMessage: description,
      ...state,
    };
  }),
  on(fromLoad.UpdatePocketsReset, (state) => {
    return initUpdatePockets;
  }),
);
