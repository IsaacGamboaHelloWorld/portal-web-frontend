import { combineReducers } from '@ngrx/store';
import { blockProductReducer as blockProductResponse } from './block-product.reducer';
import { debitCardListReducer as debitCardListResponse } from './debit-cards-list.reducer';

export const BlockProductsReducers = combineReducers({
  blockProductResponse,
  debitCardListResponse,
});
