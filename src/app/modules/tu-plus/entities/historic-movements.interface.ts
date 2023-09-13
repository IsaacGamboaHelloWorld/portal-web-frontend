import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface IResHistoricMovements extends GenericResponse {
  ListTransactions: ListTransaction[];
  CurrentPage: number;
  NextPage: boolean;
  specificErrorMessage: string;
  errorMessageCode: number;
}

export interface ListTransaction {
  TransactionId: string;
  CancelTrxId: string;
  CardNumber: string;
  AccountPoints: string;
  TotalPoints: string;
  BranchName: string;
  State: string;
  CreatedDt: string;
  TrnType: string;
  SubStatus: string;
  OverrideReasonCode: string;
  AccumulationItem: AccumulationItem[];
  TotalAmount: string;
  RedemptionItem: RedemptionItem[];
}

export interface AccumulationItem {
  IdAccrualed: string;
  PointName: string;
  AccrualedPoints: string;
  PointsRemaining: string;
  PointsUsedValue: string;
  AccumulationPartner: string;
  EstablishmentCalc: string;
  EstablishDt: string;
  ExpDt: string;
  Desc: string;
}

export interface RedemptionItem {
  AccrualItemID: string;
  ItemCount: string;
  BalType: string;
  Amt: string;
  BalTypeRetencion: string;
  AmtRetencion: string;
  Desc: string;
  DescRetencion: string;
  PartnerName: string;
  Value: string;
}
