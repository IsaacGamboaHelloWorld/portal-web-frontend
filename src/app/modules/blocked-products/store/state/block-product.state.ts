import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { BlockProductStateData } from '../../entities/block-product-response';
import { DebitCardListStateData } from '../../entities/debit-cards-response';

export const BlockProductFeatureName = 'blockProduct';

export type BlockProductModuleState = Readonly<{
  blockProductResponse: BlockProductStateData;
  debitCardListResponse: DebitCardListStateData;
}>;

export const FEATURE_BLOCK_PRODUCT_REDUCER = new InjectionToken<
  ActionReducerMap<BlockProductModuleState>
>('Feature Block Product Reducer');
