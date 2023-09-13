import { createReducer, on } from '@ngrx/store';

import { IMovePocketResp } from '../../entities/move-pockets';
import * as fromMove from '../actions/move-money.action';

export interface IMoveMoney {
  data: IMovePocketResp;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  request: object;
  rqUid: string;
}

export const initMoveMoney: IMoveMoney = {
  data: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
  request: null,
  rqUid: '',
};

export const moveMoneyPocketReducer = createReducer(
  initMoveMoney,
  on(fromMove.MoveMoneyPocketsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      request: null,
      rqUid: '',
    };
  }),
  on(fromMove.MoveMoneyPocketsSuccess, (state, { pocketsData }) => {
    return {
      error: false,
      loading: false,
      loaded: true,
      data: pocketsData,
      errorMessage: '',
      request: pocketsData.request,
      rqUid: pocketsData.rqUid,
    };
  }),
  on(fromMove.MoveMoneyPocketsFail, (state, { description }) => {
    return {
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
      data: null,
      request: null,
      rqUid: '',
    };
  }),
  on(fromMove.MoveMoneyPocketsReset, (state) => {
    return initMoveMoney;
  }),
);
