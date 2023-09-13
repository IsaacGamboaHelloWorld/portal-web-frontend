export const HISTORIC_MOVEMENT_MAX_RANGE = 30;
export const HISTORIC_MOVEMENT_IS_PAGINATION = false;
export const HISTORIC_MOVEMENT_NUM_PAGE = 0;
export const CONFIGURATION_TYPE = 'cuenta';
export const MAX_ITEMS_OTP = 8;
// Bines que no aplican para abono a TC PROPIAS desde tuplus
export const REGEX_BIN_NO_REDEEM = '^(539814|435651|435729|536170)';

// https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2635792917/Points+TuPlus+API
export enum ERROR_MESSAGE {
  DEFAULT_ERROR_CODE = -1,
  GENERATION_CODE_MAX_RETRY = 4,
  GENERATION_CODE_MAX_RETRY_OTP = 5,
  REDEMPTION_CODE_MAX_RETRY = 8,
  REDEMPTION_SHOW_LAST_MOVEMENTS = 11,
}

export enum ACCOUNT_TYPE_CODE {
  DEPOSIT_ACCOUNT = 'DEPOSIT_ACCOUNT',
  CREDIT_CARD = 'CREDIT_CARD',
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
}
export enum ACCOUNT_TYPE_NAME {
  DEPOSIT_ACCOUNT = 'Cuenta-Ahorros',
  CURRENT_ACCOUNT = 'Cuenta-Corriente',
  CREDIT_CARD = 'Tarjeta-De-Credito',
}

export enum BANK_ID {
  POPULAR = '00010029',
}

export enum BANK_ICONS {
  POPULAR = '/logo-redondo-popular.svg',
  AVVILLAS = '/logo-redondo-avvillas.svg',
  BOGOTA = '/logo-redondo-bogota.svg',
  OCCIDENTE = '/logo-redondo-occidente.svg',
  AVAL = '/logo-redondo-aval.svg',
}

export enum BANK_NICKNAME {
  POPULAR = 'POPULAR',
  AVVILLAS = 'AVVILLAS',
  BOGOTA = 'BOGOTA',
  OCCIDENTE = 'OCCIDENTE',
  AVAL = 'AVAL',
}
export enum BANK_NAME {
  POPULAR = 'Banco Popular',
  AVVILLAS = 'Banco AV Villas',
  BOGOTA = 'Banco de Bogotá',
  OCCIDENTE = 'Banco de Occidente',
  AVAL = 'Grupo Aval',
}

export enum TYPE_MOVEMENTS {
  CANJE = 'Canje',
  ACUMULACION = 'Acumulación',
}
