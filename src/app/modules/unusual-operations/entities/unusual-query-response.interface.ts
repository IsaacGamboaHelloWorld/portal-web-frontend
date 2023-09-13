import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IUnusualOPQueryResponse extends GenericResponse {
  TransactionsByCard: ITransactionsByCard[];
}

export interface ITransactionsByCard {
  CardNum: string;
  DepAcctTrnRec: IDepAcctTrnRec[];
}

export interface IDepAcctTrnRec {
  BankAcctTrnRec: IBankAcctTrnRec;
  CommerceInfo: ICommerceInfo;
  Country: string;
  TrnId: string;
  CurAmt: ICurAmt;
}

export interface IBankAcctTrnRec {
  TrnSrc: string;
  OrigDt: string;
  TrnType: string;
}

export interface ICurAmt {
  Amt: number;
  CurCode: string;
}

export interface ICommerceInfo {
  Name: string;
}
