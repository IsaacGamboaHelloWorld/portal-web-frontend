import { Product } from '../products/product';
export interface PSEPaySetData {
  productFrom: Product;
  trazability: string;
  customFactsTransaction: ICustomTrx;
  amount: string;
}

export interface ICustomTrx {
  Correo_Pagador_ACH: string;
  ID_Pagador_ACH: string;
  Tipo_ID_Pagador_ACH: string;
  TIPO_COMERCIO: string;
  ID_Beneficiario_ACH: string;
  Score_ACH: string;
  ENTITY_URL: string;
  Telefono_Pagador_ACH: string;
  NOMBRE_COMERCIO: string;
  Tipo_ID_Beneficiario_ACH: string;
  Cod_rta_ACH: string;
}
