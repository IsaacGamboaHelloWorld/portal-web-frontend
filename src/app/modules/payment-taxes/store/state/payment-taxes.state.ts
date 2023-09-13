import { Product } from '../../../../core/models/products/product';
import { IProductActive } from '../../../../store/reducers/models/product-active/product-active.reducer';

export const NewPaymentTaxesFeatureName = 'NewPaymentTaxesModuleState';
export const ProdsFeatureName = 'models';

export type ProductsPaymentTaxesNewState = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;
