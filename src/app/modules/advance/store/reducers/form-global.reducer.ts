import { IFormGlobal } from '@modules/advance/entities/form-global';
import { createReducer, on } from '@ngrx/store';

import {
  setAdvanceHowMuch,
  setAdvanceReset,
  setAdvanceToWho,
  setAdvanceWhen,
} from '@modules/advance/store/actions/advance.action';

export const initFormGlobal: IFormGlobal = {
  origin: null,
  destination: null,
  description: '',
  date: '',
  amount: null,
  year: null,
  month: null,
  fees: null,
};

export const formGlobalReducer = createReducer(
  initFormGlobal,
  on(setAdvanceToWho, (state, { origin, destination }) => {
    return {
      ...state,
      origin,
      destination,
    };
  }),
  on(setAdvanceHowMuch, (state, { amount, description, year, fees, month }) => {
    return {
      ...state,
      amount,
      description,
      year,
      month,
      fees,
    };
  }),
  on(setAdvanceWhen, (state, { date }) => {
    return {
      ...state,
      date,
    };
  }),
  on(setAdvanceReset, (state) => initFormGlobal),
);
