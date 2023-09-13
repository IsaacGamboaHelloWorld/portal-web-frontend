import { IGenericState } from '@app/core/interfaces/generic-state.interface';
import { IAdditionalData } from '../../entities/unusual-approve-response.interface';
import { ITransactionsByCard } from '../../entities/unusual-query-response.interface';
import { initUnusualOPApprove } from '../reducers/unusual-approve.reducers';
import { initUnusualOPQuery } from '../reducers/unusual-query.reducers';

export interface IUnusualOperationState {
  unusualQuery: IUnusualOpQuery;
  unusualApprove: IUnusualOpApprove;
}

export const initUnusualOperation: IUnusualOperationState = {
  unusualQuery: initUnusualOPQuery,
  unusualApprove: initUnusualOPApprove,
};

export interface IUnusualOpQuery extends IGenericState {
  data: ITransactionsByCard[];
}

export interface IUnusualOpApprove extends IGenericState {
  data: IAdditionalData[];
}
