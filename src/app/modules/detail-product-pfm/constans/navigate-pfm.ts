import { Navigate } from '@app/core/constants/navigate';
import { createNavigateObject } from '@app/shared/helpers/map-options-to-navigate';

export enum NavigatePfm {
  home = '',
  recategorization = 'recategorization',
}

export interface INavigatePfm {
  home: string;
  recategorization: string;
}

export const _internalNavigate: INavigatePfm = createNavigateObject(
  NavigatePfm,
);

export const _fullNavigate: INavigatePfm = createNavigateObject(
  NavigatePfm,
  Navigate.detailPFM,
);
