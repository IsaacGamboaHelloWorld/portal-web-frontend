import { createReducer, on } from '@ngrx/store';
import { IPocketFormOne } from '../../entities/new-pockets';
import * as fromStepOne from '../actions/formOne.action';

export const initFormStepOnePockets: IPocketFormOne = {
  account_origin: null,
  name: null,
  type: null,
};

export const newPocketStepOneReducer = createReducer(
  initFormStepOnePockets,
  on(fromStepOne.SetStepOnePockets, (state, { formOne }) => {
    return formOne;
  }),
  on(fromStepOne.ResetStepOnePockets, (state) => {
    return initFormStepOnePockets;
  }),
);
