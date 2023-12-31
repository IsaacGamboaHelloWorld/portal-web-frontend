export enum BANKS {
  BANCO_DE_BOGOTA = 'BANCO_DE_BOGOTA',
  BANCO_POPULAR = 'BANCO_POPULAR',
  BANCO_OCCIDENTE = 'BANCO_OCCIDENTE',
  BANCO_AV_VILLAS = 'BANCO_AV_VILLAS',
  PORVENIR = 'PORVENIR',
  FACIL_PASS = 'FACIL_PASS',
}

export interface IBanks {
  BANCO_DE_BOGOTA: string;
  BANCO_POPULAR: string;
  BANCO_OCCIDENTE: string;
  BANCO_AV_VILLAS: string;
  PORVENIR: string;
  FACIL_PASS: string;
}

export const OTHER_BANKS: string[] = [
  BANKS.BANCO_DE_BOGOTA,
  BANKS.BANCO_OCCIDENTE,
  BANKS.BANCO_AV_VILLAS,
  BANKS.PORVENIR,
  BANKS.FACIL_PASS,
];
