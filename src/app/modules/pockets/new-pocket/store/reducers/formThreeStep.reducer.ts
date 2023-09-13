import { createReducer, on } from '@ngrx/store';
import { IPocketFormThree } from '../../entities/new-pockets';
import * as fromStepThree from '../actions/formThree.action';

export const initFormStepThreePockets: IPocketFormThree = {
  amount: null,
  recursive: null,
  period: null,
};

export const newPocketStepThreeReducer = createReducer(
  initFormStepThreePockets,
  on(fromStepThree.SetStepThreePockets, (state, { formThree }) => {
    return formThree;
  }),
  on(fromStepThree.ResetStepThreePockets, (state) => {
    return initFormStepThreePockets;
  }),
);
