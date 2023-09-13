export enum TypeCommercePse {
  MORTGATE_CREDIT = 'O0301', // Banco Popular - Crédito Hipotecario
  OTHER_CREDIT = 'O0302', // Banco Popular - Otros Créditos
  CREDIT_CARD = 'O0303', // Banco Popular - Tarjeta de Crédito Visa - MasterCard
  CREDIT = 'O0304', // PSE Banco Popular - Libre Destino - Leasing  y Otras Carteras Corporativas
}

export interface ITypeCommercePse {
  MORTGATE_CREDIT: string;
  OTHER_CREDIT: string;
  CREDIT_CARD: string;
  CREDIT: string;
}
