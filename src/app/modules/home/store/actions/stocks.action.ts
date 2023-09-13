import { createAction } from '@ngrx/store';

import {
  Dividend,
  IStockPeriod,
  IStocksAllParams,
  IStockType,
  Stocks,
} from '@modules/home/entities/stocks.interface';

export const stocksTypeLoad = createAction('[HOME / API] Stocks Type Load');

export const stocksTypeFail = createAction(
  '[HOME / API] Stocks Type Fail',
  (description: string) => ({ description }),
);

export const stocksTypeSuccess = createAction(
  '[HOME / API] Stocks Type Success',
  (stockType: IStockType[]) => ({ stockType }),
);

export const stocksPeriodLoad = createAction('[HOME / API] Stocks Period Load');

export const stocksPeriodFail = createAction(
  '[HOME / API] Stocks Period Fail',
  (description: string) => ({ description }),
);

export const stocksPeriodSuccess = createAction(
  '[HOME / API] Stocks Period Success',
  (period: IStockPeriod[]) => ({ period }),
);

export const stocksAllLoad = createAction(
  '[HOME / API] Stocks All Load',
  (params: IStocksAllParams) => params,
);

export const stocksAllFail = createAction(
  '[HOME / API] Stocks All Fail',
  (description: string, code: string = '') => ({ description, code }),
);

export const stocksAllSuccess = createAction(
  '[HOME / API] Stocks All Success',
  (all: { stocksAval: Stocks[]; dividends: Dividend[] }) => ({ all }),
);

export const stocksAllReset = createAction('[HOME / API] Stocks All Reset');
