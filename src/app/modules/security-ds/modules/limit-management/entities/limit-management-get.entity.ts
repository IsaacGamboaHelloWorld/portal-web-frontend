import { GenericRequest, GenericResponse } from '@app/core/interfaces';
import { ITransferLimitData } from './limit-management-create.entity';

export interface ILimitManagementGetRequest extends GenericRequest {
  channel: string;
  operation: LimitManagementOperation;
}

export interface ILimitManagementGetResponse extends GenericResponse {
  limits: ITransferLimitData; // Limits configured by the user ( Autogestion-Topes )
  limitsBank: ITransferLimitData; // Limits determinated by Business Bank ( Labels Informatives )
  firstTime: boolean;
  channel: string;
  adders: string;
}

export interface ILimitManagementAddress {
  lastUpdateDate: string;
  currentAmountByDay: number;
  currentAmountByDayAnotherBank: number;
}

export type LimitManagementOperation =
  | 'transfer'
  | 'recharge'
  | 'shopping'
  | 'advance'
  | 'payment';
