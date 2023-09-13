import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { GlobalDataService } from '@core/services/global-data/global-data.service';
import {
  IStocksAvalAll,
  IStocksPeriod,
  IStocksType,
} from '@modules/home/entities/stocks.interface';
import { StocksService } from '@modules/home/services/stocks.service';
import * as stocks from '@modules/home/store/actions/stocks.action';

@Injectable()
export class StocksEffects {
  constructor(
    private actions$: Actions,
    private globalDataService: GlobalDataService,
    private stocksService: StocksService,
  ) {}

  LoadStocksType: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksTypeLoad),
      switchMap((action) => {
        return this.stocksService.typeStocks().pipe(
          take(1),
          takeUntil(this.globalDataService.cancel),
          map((resp: IStocksType) => {
            const { success, stockTypes, errorMessage } = resp;
            if (success) {
              return stocks.stocksTypeSuccess(stockTypes);
            }
            return stocks.stocksTypeFail(errorMessage);
          }),
          catchError(() => of(stocks.stocksTypeFail(''))),
        );
      }),
    ),
  );

  LoadStocksPeriod: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksTypeLoad),
      switchMap((action) => {
        return this.stocksService.periodStocks().pipe(
          take(1),
          takeUntil(this.globalDataService.cancel),
          map((resp: IStocksPeriod) => {
            const { success, periods, errorMessage } = resp;
            if (success) {
              return stocks.stocksPeriodSuccess(periods);
            }
            return stocks.stocksPeriodFail(errorMessage);
          }),
          catchError(() => of(stocks.stocksPeriodFail(''))),
        );
      }),
    ),
  );

  LoadStocksAll: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksAllLoad),
      switchMap((action) => {
        const { period, stockType } = action;
        return this.stocksService.allStocks({ period, stockType }).pipe(
          take(1),
          takeUntil(this.globalDataService.cancel),
          map((resp: IStocksAvalAll) => {
            const { success, dividends, stocksAval, errorMessage, code } = resp;
            if (success) {
              return stocks.stocksAllSuccess({ dividends, stocksAval });
            }
            return stocks.stocksAllFail(errorMessage, code);
          }),
          catchError(() => of(stocks.stocksAllFail(''))),
        );
      }),
    ),
  );
}
