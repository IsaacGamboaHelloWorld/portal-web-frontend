import { IGenericState } from '@app/core/interfaces';
import { createReducer, on } from '@ngrx/store';
import { IPfmCreditCardData } from '../../entities';
import {
  creditCardsPfmFail,
  creditCardsPfmLoad,
  creditCardsPfmReset,
  creditCardsPfmSuccess,
} from '../actions';

export interface IPfmCreditCardstate extends IGenericState {
  data: IPfmCreditCardData;
}

export const initPfmCreditCard: IPfmCreditCardstate = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
};

export const pfmCreditCardsReducer = createReducer(
  initPfmCreditCard,
  on(creditCardsPfmLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      success: false,
    };
  }),
  on(creditCardsPfmSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data,
    };
  }),
  on(creditCardsPfmFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
    };
  }),
  on(creditCardsPfmReset, (_state) => initPfmCreditCard),
);
