import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ILoadPrefs } from '../reducers/news.reducers';
import { NewsFeatureName, NewsModuleState } from '../state/news.state';

export const NewsRootSelector = createFeatureSelector<NewsModuleState>(
  NewsFeatureName,
);

export const getPrefsState = createSelector(
  NewsRootSelector,
  (state: NewsModuleState) => state.loadPref,
);

export const selectPrefsNews = createSelector(
  getPrefsState,
  (state: ILoadPrefs) => state,
);
