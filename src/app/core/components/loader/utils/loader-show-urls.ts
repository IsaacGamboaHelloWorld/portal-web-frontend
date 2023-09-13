import { environment } from '@environment';

export const URLS_WITH_LOADER = [
  environment.api.services.code_auth.allowed,
  environment.api.services.customer.updateProfile,
  environment.api.services.customer.catalogs,
  environment.api.services.logout,
  environment.api.services.movementsFile,
  environment.api.services.customer.updateSecureData,
];
