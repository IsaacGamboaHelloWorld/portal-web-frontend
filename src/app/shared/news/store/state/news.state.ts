import { ILoadPrefs } from '../reducers/news.reducers';

export const NewsFeatureName = 'NewsModuleState';

export type NewsModuleState = Readonly<{
  loadPref: ILoadPrefs;
}>;
