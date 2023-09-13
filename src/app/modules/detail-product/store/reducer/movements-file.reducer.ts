import * as MovementsFileActions from '@app/modules/detail-product/store/actions/movements-file.action';
import { createReducer, on } from '@ngrx/store';
import { MovementsFileState } from '../../entities/movements-file';

export const initMovementsFileState: MovementsFileState = {
  data: null,
  success: false,
  loading: false,
  loaded: false,
  error: false,
};

export const movementsFileReducer = createReducer(
  initMovementsFileState,
  on(MovementsFileActions.MovementsFileLoad, (state) => {
    return {
      ...state,
      data: null,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(MovementsFileActions.MovementsFileSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      success: true,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(MovementsFileActions.MovementsFileFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
  on(MovementsFileActions.MovementsFileReset, (state) => {
    return initMovementsFileState;
  }),
);
