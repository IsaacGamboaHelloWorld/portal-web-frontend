import { IHomePockets } from '@modules/pockets/home-pockets/store/reducers/get-pockets.reducer';
import { Product } from '../../../../../core/models/products/product';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';
import { IPocketActive } from '../../../home-pockets/store/reducers/active-pocket.reducer';
import { IDeletePocket } from '../reducers/delete-pocket.reducer';
import { IEditPocket } from '../reducers/edit-pocket.reducer';

export const EditPocketFeatureName = 'EditPocketModuleState';
export const HomeAccountsFeatureName = 'models';
export const ActiveProdsFeatureName = 'models';

export type EditPocketModuleState = Readonly<{
  homePockets: IHomePockets;
  editPocket: IEditPocket;
  deletePocket: IDeletePocket;
}>;

export type ProductsPocketsHomeState = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;

export type EditActivePocketState = Readonly<{
  activePocket: IPocketActive;
}>;
