import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TributaryState } from '../../entities/tributary';
import { NewTributaryFeatureName } from '../state/tributary.state';

export const NewTributaryRootSelector = createFeatureSelector<TributaryState>(
  NewTributaryFeatureName,
);

export const selectTributary = createSelector(
  NewTributaryRootSelector,
  (state: TributaryState) => state.tributary,
);

export const selectTributaryIncome = createSelector(
  NewTributaryRootSelector,
  (state: TributaryState) => state.tributaryIncome,
);

export const selectTributaryIncomeTaxTC = createSelector(
  NewTributaryRootSelector,
  (state: TributaryState) => state.tributaryIncomeTaxTC,
);

export const selectTributaryRac = createSelector(
  NewTributaryRootSelector,
  (state: TributaryState) => state.tributaryRac,
);
