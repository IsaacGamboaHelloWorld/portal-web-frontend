import { Action } from '@ngrx/store';
import { AccountTransferInterface } from '../../entities/accountTransfer.interface';
import { IFormOneTransferInterface } from '../../entities/formOneTransfer.interface';

export const TRANSFER_LOAD = '[OLD TRANSFER Account Transfer] Load Transfer';
export const TRANSFER_SUCCESS =
  '[OLD TRANSFER Account Transfer] Transfer Success';
export const TRANSFER_FAIL = '[OLD TRANSFER Account Transfer] Transfer Fail';
export const TRANSFER_RESET = '[OLD TRANSFER Account Transfer] Transfer reset';

export class TransferLoadAction implements Action {
  readonly type: string = TRANSFER_LOAD;

  constructor(
    public formOne: IFormOneTransferInterface,
    public amount: number | string,
    public voucher: string,
    public description: string,
    public dueDate: string,
    public isNew: boolean,
    public scheduledTransfer: boolean,
    public favorite: boolean,
    public transactionCost: string,
    public nickNameFrom: string,
    public nickNameTo: string,
  ) {}
}

export class TransferSuccessAction implements Action {
  readonly type: string = TRANSFER_SUCCESS;
  constructor(public transfer: AccountTransferInterface) {}
}

export class TransferFailAction implements Action {
  readonly type: string = TRANSFER_FAIL;
  constructor(public specificErrorCode: string = '') {}
}

export class TransferResetAction implements Action {
  readonly type: string = TRANSFER_RESET;
}

export type actions =
  | TransferLoadAction
  | TransferSuccessAction
  | TransferFailAction
  | TransferResetAction;
