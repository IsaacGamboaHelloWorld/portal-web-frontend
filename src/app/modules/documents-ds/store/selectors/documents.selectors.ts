import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DocumentsState,
  NewDocumentsFeatureName,
  ProdsFeatureName,
  ProductsNewState,
} from '../state/documents.state';

export const NewDocumentsRootSelector = createFeatureSelector<DocumentsState>(
  NewDocumentsFeatureName,
);

export const HomeProductsRootSelector = createFeatureSelector<ProductsNewState>(
  ProdsFeatureName,
);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsNewState) => state.product,
);

export const selectTributaryGmf = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryGmf,
);

export const selectTributaryRetention = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryRetention,
);

export const selectTributaryIncomeTaxTC = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryIncomeTaxTC,
);

export const selectCertificate = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.certificate,
);

export const selectExtracts = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.extracts,
);

export const selectExtractsPeriods = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.periods,
);

export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);
