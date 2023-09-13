import { Product } from '@app/core/models/products/product';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';

export const NewPayStackFeatureName = 'NewPayStackModuleState';
export const ProdsFeatureName = 'models';

export type ProductsPayStakNewState = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;
