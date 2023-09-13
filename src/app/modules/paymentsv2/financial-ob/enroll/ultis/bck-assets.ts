export enum AssetsEnroll {
  BANK = 'Banco',
  PROMP_BANk = '¿A qué banco pertenece el producto?',
  PRODUCT = 'Producto',
  TYPE_PRODUCT = 'Elige el tipo de obligación',
  NUMBER_RPODUCT = 'Número del producto',
  NAME_PROD = 'Nombre del producto',
  NAME_PROD_PROMP = 'Ej: Crédito carro',
  BUTTON = 'Inscribir obligación',
}
export interface IAssetsEnroll {
  BANK: string;
  PROMP_BANk: string;
  PRODUCT: string;
  TYPE_PRODUCT: string;
  NUMBER_RPODUCT: string;
  NAME_PROD: string;
  NAME_PROD_PROMP: string;
  BUTTON: string;
}
