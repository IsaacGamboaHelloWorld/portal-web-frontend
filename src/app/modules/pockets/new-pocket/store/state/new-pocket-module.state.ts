import { Product } from '../../../../../core/models/products/product';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';

export const NewPocketFeatureName = 'NewPocketsModuleState';
export const ProdsFeatureName = 'models';

export type ProductsPocketsNewState = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;
