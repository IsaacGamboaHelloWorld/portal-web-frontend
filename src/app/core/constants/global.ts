export const NEW = 'new';
export const NEW_PAYMENT = 'NEW PAYMENT';
export const NEW_SERVICE = 'NEW SERVICE';
export const CREDIT_CARD = 'CREDIT CARD';
export const OWNER = 'OWNER';
export const NO_OWNER = 'NO_OWNER';
export const OTHER = 'other';
export const URL_OFFERS =
  'https://ahorro-dev-popular.avaldigitallabs.com/sso?channel=pb&dDL=';
export const URL_OFFERS_UTM = '&utm_source=PB&utm_medium=direct';
export const URL_CREDIT_CARD = '?utm_source=PB&utm_medium=CardPB';
export const URL_CDT_UTM = '&utm_source=PB&utm_medium=direct';
export const BTN_OFFERS = 'Cuentas de ahorro';
export const BTN_CDT = 'Ahorra con tu CDT';
export const BTN_CREDIT_CARD = 'Tarjeta de crédito';
export const TIME_SYMMETRIC_SESSION = 7200;
export const INTERVAL_TIME_SESSION = 300000;
export const SERVICE_PUBLIC = 'public';
export const NORMAL_PAYMENT = 'normal';
export const IP = '192.168.1.1';
export const WITH_CARD = 'WITH_CARD'; // Withdrawal no card
export const THIRD_PARTY = 'THIRD_PARTY'; // Withdrawal no card
export const VALUES_WHITDRAWAL = [
  20000,
  50000,
  100000,
  200000,
  300000,
  400000,
  600000,
];
export const MAX_AMOUNT_WITH_CARD = 2000000;
export const MIN_AMOUNT_WITH_CARD = 10000;
export const TIME_OTP = 60;
export const ID_BANK_POPULAR = '0002';
export const ID_CHANNEL = 'PB';

export const BLOCKED_ERRORS_CODE = ['07', '20', '62'];

export const otherOptionsConst = [
  {
    accountId: NEW_PAYMENT,
    accountType: 'Nueva obligación bancaria',
  },
];
export const newSerOptionsConst = [
  {
    serId: NEW_SERVICE,
    serType: 'Nuevo Servicio Público/Privado',
  },
];
export const loansTypeConst = [
  {
    loanType: CREDIT_CARD,
    loanName: 'Tarjeta de crédito',
  },
];

export const errorMessage500 =
  'Tenemos problemas técnicos en este momento. Inténtalo de nuevo.😥';
