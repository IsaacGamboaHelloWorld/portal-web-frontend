import { createReducer, on } from '@ngrx/store';

import { IHomePocketsRecord } from '../../entities/home-pockets';
import * as pocket from '../actions/active-pocket.action';

export interface IPocketActive {
  pocketId: string;
  pocketType: string;
  pocketName: string;
  savingGoal: string;
  amountPeriodicSavings: string;
  amountSaved: string;
  pendingAmount: string;
  category: string;
  pocketPeriod?: string;
  pocketPeriodDescription?: string;
  parentId: string;
  parentType: string;
  pocketList?: IHomePocketsRecord[];
}

export const initPocketActive: IPocketActive = null;

export const pocketActiveReducer = createReducer(
  initPocketActive,
  on(pocket.SetPocketActive, (state, { pocketDetail }) => {
    return pocketDetail;
  }),
  on(pocket.ResetPocketActive, (state) => {
    return initPocketActive;
  }),
);
