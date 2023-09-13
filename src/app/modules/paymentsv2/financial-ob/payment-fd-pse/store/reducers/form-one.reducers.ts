import { createReducer, on } from '@ngrx/store';
import { ISetFormOne } from '../../entities/step-form-one.interface';
import {
  resetFormOneAction,
  setFormOneAction,
} from '../actions/form-one.actions';

export const initFormOneFd: ISetFormOne = {
  origin: null,
  destination: null,
  index: null,
};

export const formOneFdReducer = createReducer(
  initFormOneFd,
  on(setFormOneAction, (state, { form }) => {
    return {
      ...state,
      origin: form.origin,
      destination: form.destination,
      index: form.index,
    };
  }),
  on(resetFormOneAction, (state) => {
    return initFormOneFd;
  }),
);
