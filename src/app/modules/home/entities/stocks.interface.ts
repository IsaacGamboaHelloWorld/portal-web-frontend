export interface IStocksPeriod {
  periods: IStockPeriod[];
  success: true;
  errorMessage: string;
}

export interface IStocksType {
  stockTypes: IStockType[];
  success: true;
  errorMessage: string;
}

export interface IStockType {
  id: string;
  value: string;
}

export interface IStockPeriod {
  id: string;
  value: number;
}

export interface Stocks {
  balanceDescription: string;
  amount: string;
  date: Date;
  dateDescription: string;
  numberBaseStocks: string;
}

export interface Dividend {
  channelCode: string;
  accountId: string;
  accountType: string;
  bankId: string;
  amount: string;
}

export interface IStocksAvalAll {
  stocksAval: Stocks[];
  dividends: Dividend[];
  success: boolean;
  errorMessage: string;
  code: string;
}

export interface IStocksAllParams {
  period: string;
  stockType: string;
}
