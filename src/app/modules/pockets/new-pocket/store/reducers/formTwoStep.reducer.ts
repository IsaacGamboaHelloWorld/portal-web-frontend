import { createReducer, on } from '@ngrx/store';
import { IPocketFormTwo } from '../../entities/new-pockets';
import * as fromStepTwo from '../actions/formTwo.action';

export const initFormStepTwoPockets: IPocketFormTwo = {
  goal: null,
};

export const newPocketStepTwoReducer = createReducer(
  initFormStepTwoPockets,
  on(fromStepTwo.SetStepTwoPockets, (state, { formTwo }) => {
    return formTwo;
  }),
  on(fromStepTwo.ResetStepTwoPockets, (state) => {
    return initFormStepTwoPockets;
  }),
);
