import { createReducer, on } from '@ngrx/store';

import { ICategoriesPocket } from '../../entities/new-pockets';
import * as fromCategories from '../actions/categories.action';

export const initCategoriesPocket: ICategoriesPocket = {
  categories: null,
  success: false,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const categoriesPocketReducer = createReducer(
  initCategoriesPocket,
  on(fromCategories.CategoriesocketLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromCategories.CategoriesPocketSuccess, (state, { data }) => {
    return {
      categories: data.categories,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(fromCategories.CategoriesPocketFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      ...state,
    };
  }),
);
