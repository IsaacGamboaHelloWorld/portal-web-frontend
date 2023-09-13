import { createReducer, on } from '@ngrx/store';
import { FreeDestination } from '../../../../core/interfaces/free-destination.interface';
import * as fromDestiny from '../../../actions/models/free-destiny/free-destinations.action';

export interface FreeDestinyState {
  freeDestinations: FreeDestination[];
  loaded: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const initFreeDestiny: FreeDestinyState = {
  freeDestinations: [],
  loaded: false,
  loading: false,
  error: false,
  errorMessage: '',
};

export const freeDestinyReducer = createReducer(
  initFreeDestiny,
  on(fromDestiny.freeDestinyAllLoad, (state) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromDestiny.freeDestinyAllSuccess, (state, { freeDestinations }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      freeDestinations,
    };
  }),
  on(fromDestiny.freeDestinyAllFailed, (state, { errorMessage }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
      errorMessage,
    };
  }),
);
