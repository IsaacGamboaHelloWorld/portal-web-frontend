import { Navigate } from '@app/core/constants/navigate';
import { createNavigateObject } from '@app/shared/helpers/map-options-to-navigate';

export enum NavigateLimitManagement {
  home = '',
  onboarding = 'onboarding',
}

export interface INavigateLimitManagement {
  home: string;
  onboarding: string;
}

export const _internalNavigate: INavigateLimitManagement = createNavigateObject(
  NavigateLimitManagement,
);

export const _fullNavigate: INavigateLimitManagement = createNavigateObject(
  NavigateLimitManagement,
  Navigate.limit_management,
);
