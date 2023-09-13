import { Product } from '@app/core/models/products/product';
import { createReducer, on } from '@ngrx/store';
import { optionTabsEnum } from '../../constans/tabs-options.enum';
import { IDatePfm } from '../../entities';
import {
  pfmDateSelected,
  pfmDateSelectedReset,
  pfmIsFirstTime,
  pfmProductSelected,
  pfmProductSelectedReset,
  pfmTabSelected,
  pfmTabSelectedReset,
} from '../actions';

export interface IPfmNavigateState {
  tab: optionTabsEnum.resumen;
  date: IDatePfm;
  product: Product;
  isFirstTime: boolean;
}

export const initPfmNavigate: IPfmNavigateState = {
  date: {
    month: '',
    year: '',
  },
  product: null,
  tab: optionTabsEnum.resumen,
  isFirstTime: true,
};

export const pfmNavigateReducer = createReducer(
  initPfmNavigate,
  on(pfmTabSelected, (state, { tab }) => {
    return {
      ...state,
      tab,
    };
  }),
  on(pfmTabSelectedReset, (state) => {
    return {
      ...state,
      tab: optionTabsEnum.resumen,
    };
  }),
  on(pfmDateSelected, (state, { date }) => {
    return {
      ...state,
      date,
    };
  }),
  on(pfmDateSelectedReset, (state) => {
    return {
      ...state,
      date: {
        month: '',
        year: '',
      },
    };
  }),
  on(pfmProductSelected, (state, { product }) => {
    return {
      ...state,
      product,
    };
  }),
  on(pfmProductSelectedReset, (state) => {
    return {
      ...state,
      product: null,
    };
  }),
  on(pfmIsFirstTime, (state, { value }) => {
    return {
      ...state,
      isFirstTime: value,
    };
  }),
);
