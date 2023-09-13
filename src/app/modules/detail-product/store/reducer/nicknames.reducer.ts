import * as NickNamesActions from '@app/modules/detail-product/store/actions/nicknames.actions';
import { createReducer, on } from '@ngrx/store';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
} from '../../entities/nicknames';

// All
export const initNicknamesAll: INicknamesAll = {
  nicknames: null,
  success: false,
};

export const NicknamesAllReducer = createReducer(
  initNicknamesAll,
  on(NickNamesActions.NicknamesAllLoad, (state) => {
    return {
      ...state,
      nicknames: null,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesAllSuccess, (state, { data }) => {
    return {
      ...state,
      nicknames: data.nicknames,
      success: data.success,
    };
  }),
  on(NickNamesActions.NicknamesAllFail, (state, { description }) => {
    return {
      ...state,
      success: false,
      errorMessage: description,
    };
  }),
  on(NickNamesActions.NicknamesAllReset, (state) => {
    return initNicknamesAll;
  }),
);
// Create
export const initNicknamesCreate: IAnswerNicknamesCreate = {
  success: false,
};

export const NicknamesCreateReducer = createReducer(
  initNicknamesCreate,
  on(NickNamesActions.NicknamesCreateLoad, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesCreateSuccess, (state, { data }) => {
    return {
      ...state,
      success: true,
    };
  }),
  on(NickNamesActions.NicknamesCreateFail, (state, { description }) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesCreateReset, (state) => {
    return initNicknamesCreate;
  }),
);
// Delete
export const initNicknamesDelete: IAnswerNicknamesDelete = {
  success: false,
};

export const NicknamesDeleteReducer = createReducer(
  initNicknamesDelete,
  on(NickNamesActions.NicknamesDeleteLoad, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesDeleteSuccess, (state, { data }) => {
    return {
      ...state,
      success: true,
    };
  }),
  on(NickNamesActions.NicknamesDeleteFail, (state, { description }) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesDeleteReset, (state) => {
    return initNicknamesDelete;
  }),
);
// Update
export const initNicknamesUpdate: IAnswerNicknamesUpdate = {
  success: false,
};

export const NicknamesUpdateReducer = createReducer(
  initNicknamesUpdate,
  on(NickNamesActions.NicknamesUpdateLoad, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesUpdateSuccess, (state, { data }) => {
    return {
      ...state,
      success: data.success,
    };
  }),
  on(NickNamesActions.NicknamesUpdateFail, (state, { description }) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(NickNamesActions.NicknamesUpdateReset, (state) => {
    return initNicknamesUpdate;
  }),
);
