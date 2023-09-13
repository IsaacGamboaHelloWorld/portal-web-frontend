import { IMoveMoney } from '@app/modules/pockets/move-pockets/store/reducers/move-money.reducer';
import { IHomePockets } from '@modules/pockets/home-pockets/store/reducers/get-pockets.reducer';
import { Product } from '../../../../../core/models/products/product';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';
import { IHomePocketsRecord } from '../../entities/home-pockets';
import { IPocketActive } from '../reducers/active-pocket.reducer';
import { ILoadPrefs } from '../reducers/load-prefs.reducer';

export const HomePocketsFeatureName = 'HomePocketsModuleState';
export const HomeAccountsFeatureName = 'models';
export const ActiveProdsFeatureName = 'models';

export type HomePocketsModuleState = Readonly<{
  homePockets: IHomePockets;
  loadPref: ILoadPrefs;
}>;

export type MovePocketsModuleState = Readonly<{
  moveData: IMoveMoney;
}>;

export type ProductsPocketsHomeState = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;

export type ActivePocketState = Readonly<{
  activePocket: IPocketActive;
}>;

export type UpdatePocketState = Readonly<{
  updatePocket: IHomePocketsRecord;
}>;
