import { createReducer, on } from '@ngrx/store';
import {
  resetFormThreeAction,
  setFormThreeAction,
} from '../actions/form-three.actions';
import { ISetFormThree } from './../../entities/step-form-three.interface';

export const initFormThreeFd: ISetFormThree = {
  amountText: null,
};

export const formThreeFdReducer = createReducer(
  initFormThreeFd,
  on(setFormThreeAction, (state, { form }) => {
    return {
      ...state,
      amountText: form.amountText,
    };
  }),
  on(resetFormThreeAction, (state) => {
    return initFormThreeFd;
  }),
);
