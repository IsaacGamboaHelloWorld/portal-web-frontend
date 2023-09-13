import { IGenericState } from '@app/core/interfaces';
import { createReducer, on } from '@ngrx/store';
import { PfmItemCategory } from '../../entities';
import {
  itemsPfmFail,
  itemsPfmLoad,
  itemsPfmReset,
  itemsPfmSuccess,
} from '../actions';

export interface IPfmItemsState extends IGenericState {
  data: PfmItemCategory[];
}

export const initPfmItems: IPfmItemsState = {
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
  data: null,
};

export const pfmItemsReducer = createReducer(
  initPfmItems,
  on(itemsPfmLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      success: false,
    };
  }),
  on(itemsPfmSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data,
    };
  }),
  on(itemsPfmFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
    };
  }),
  on(itemsPfmReset, (_state) => initPfmItems),
);
