import { createReducer, on } from '@ngrx/store';

import { ICities } from '../../entities/payment-taxes';
import * as fromCities from '../actions/cities.actions';

export const initCities: ICities = {
  cities: null,
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const citiesReducer = createReducer(
  initCities,
  on(fromCities.CitiesLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromCities.CitiesSuccess, (state, { data }) => {
    return {
      cities: data.cities,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromCities.CitiesFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
);
