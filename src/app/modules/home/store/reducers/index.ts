import { combineReducers } from '@ngrx/store';

import { NicknamesAllReducer as nicknamesAll } from '@app/modules/detail-product/store/reducer/nicknames.reducer';
import { orderOfPaymentReducer as order } from '@modules/home/store/reducers/order-of-payment.reducer';
import { stocksAllReducer as all } from '@modules/home/store/reducers/stocks/stocks-all.reducer';
import { stocksPeriodReducer as period } from '@modules/home/store/reducers/stocks/stocks-period.reducer';
import { stocksTypeReducer as type } from '@modules/home/store/reducers/stocks/stocks-type.reducer';

const stocks = combineReducers({
  all,
  period,
  type,
});

export const HomeRootReducer = combineReducers({
  stocks,
  order,
  nicknamesAll,
});
