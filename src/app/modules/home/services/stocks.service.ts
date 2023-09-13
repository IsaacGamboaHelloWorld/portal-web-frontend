import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import {
  IStocksAllParams,
  IStocksAvalAll,
  IStocksPeriod,
  IStocksType,
} from '@modules/home/entities/stocks.interface';

@Injectable()
export class StocksService {
  constructor(private http: HttpClient) {}

  public allStocks(params: IStocksAllParams): Observable<IStocksAvalAll> {
    return this.http.post<IStocksAvalAll>(
      environment.api.base + environment.api.services.stocks.all,
      params,
    );
  }

  public typeStocks(): Observable<IStocksType> {
    return this.http.post<IStocksType>(
      environment.api.base + environment.api.services.stocks.types,
      {},
    );
  }

  public periodStocks(): Observable<IStocksPeriod> {
    return this.http.get<IStocksPeriod>(
      environment.api.base + environment.api.services.stocks.period,
    );
  }
}
