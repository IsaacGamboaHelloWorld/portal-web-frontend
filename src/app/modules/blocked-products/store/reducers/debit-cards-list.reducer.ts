import * as DebitCardListActions from '@app/modules/blocked-products/store/actions/debit-cards.action';
import { createReducer, on } from '@ngrx/store';
import { DebitCardListStateData } from '../../entities/debit-cards-response';

export const initDebitCardList: DebitCardListStateData = {
  data: null,
  success: false,
  loading: false,
  loaded: false,
  error: false,
};

export const debitCardListReducer = createReducer(
  initDebitCardList,
  on(DebitCardListActions.DebitCardListLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(DebitCardListActions.DebitCardListSuccess, (state, { data }) => {
    return {
      data,
      success: data.success,
      error: false,
      loading: false,
      loaded: true,
    };
  }),
  on(DebitCardListActions.DebitCardListFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      success: false,
      errorMessage: description,
    };
  }),
  on(DebitCardListActions.DebitCardListReset, (state) => {
    return initDebitCardList;
  }),
);
