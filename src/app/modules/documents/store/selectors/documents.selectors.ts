import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentsState } from '../../entities/documents';
import {
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

export const selectTributary = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributary,
);

export const selectTributaryIncome = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryIncome,
);

export const selectTributaryIncomeTaxTC = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryIncomeTaxTC,
);
export const selectTributaryRac = createSelector(
  NewDocumentsRootSelector,
  (state: DocumentsState) => state.tributaryRac,
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
