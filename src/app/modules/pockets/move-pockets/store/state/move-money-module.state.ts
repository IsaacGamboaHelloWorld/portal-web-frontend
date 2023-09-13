import { IPocketActive } from '../../../home-pockets/store/reducers/active-pocket.reducer';
import { IMoveMoney } from '../reducers/move-money.reducer';

export const MoveMoneyPocketFeatureName = 'MoveMoneyPocketModuleState';
export const HomePocketsFeatureName = 'HomePocketsModuleState';
export const ProdsFeatureName = 'models';

export type MoveMoneyPocketModuleState = Readonly<{
  moveMoneyPocket: IMoveMoney;
}>;

export type ActivePocketHomeState = Readonly<{
  pocketActive: IPocketActive;
}>;
