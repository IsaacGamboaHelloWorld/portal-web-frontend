import { createReducer, on } from '@ngrx/store';

import { ICategoriesEPocket } from '../../entities/edit-pocket';
import * as fromCategories from '../actions/categories.action';

export const initCategoriesEPocket: ICategoriesEPocket = {
  categories: null,
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const categoriesEPocketReducer = createReducer(
  initCategoriesEPocket,
  on(fromCategories.CategoriesEPocketLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromCategories.CategoriesEPocketSuccess, (state, { data }) => {
    return {
      categories: data.categories,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromCategories.CategoriesEPocketFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
);
