import { INicknamesAll } from '@app/modules/detail-product/entities/nicknames';
import { IStocksAllState } from '@modules/home/store/reducers/stocks/stocks-all.reducer';
import { IStocksPeriodState } from '@modules/home/store/reducers/stocks/stocks-period.reducer';
import { IStocksTypeState } from '@modules/home/store/reducers/stocks/stocks-type.reducer';
import { IOrderPaymentAll } from '../../entities/order-of-payment';

export const HomeFeatureName = 'HomeModuleState';

export type HomeModuleState = Readonly<{
  stocks: {
    all: IStocksAllState;
    period: IStocksPeriodState;
    type: IStocksTypeState;
  };
  order: IOrderPaymentAll;
  nicknamesAll: INicknamesAll;
}>;
