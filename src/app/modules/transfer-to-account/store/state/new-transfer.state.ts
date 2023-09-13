import { Product } from '@app/core/models/products/product';
import { IStepNewTransfer } from '../../entities/new-transfer.interface';
import { IFormNewTransfer } from '../reducers/form-new-transfer.reducer';
import { INewTransfer } from '../reducers/new-transfer.reducer';

export const NewTransferName = 'NewTransferState';
export const ProdsFeatureName = 'models';

export interface INewTransferState {
  step: IStepNewTransfer;
  NewTransfer: INewTransfer;
  FormNewTransfer: IFormNewTransfer;
}

export type ProductsTransfer = Readonly<{
  product: Product[];
}>;
