import { createReducer, on } from '@ngrx/store';

import { IEditPocketResponse } from '../../entities/edit-pocket';
import * as fromEdit from '../actions/edit-pocket.action';

export interface IEditPocket {
  data: IEditPocketResponse;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initEditPocket: IEditPocket = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};

export const editPocketReducer = createReducer(
  initEditPocket,
  on(fromEdit.EditPocketLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromEdit.EditPocketSuccess, (state, { response }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: response,
      errorMessage: '',
    };
  }),
  on(fromEdit.EditPocketFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
  on(fromEdit.EditPocketReset, (state) => {
    return initEditPocket;
  }),
);
