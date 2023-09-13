import { Product } from '@app/core/models/products/product';

export const NewDocumentsFeatureName = 'NewDocumentsModuleState';
export const ProdsFeatureName = 'models';

export type ProductsNewState = Readonly<{
  product: Product[];
}>;
