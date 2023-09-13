import { Product } from '@app/core/models/products/product';
import { IStepFastTransfer } from '../../entities/fast-transfer.interface';
import { IFastTransfer } from '../reducers/fast-transfer.reducer';

export const FastTransferName = 'FastTransferState';
export const ProdsFeatureName = 'models';

export interface IFastTransferState {
  step: IStepFastTransfer;
  FastTransfer: IFastTransfer;
}
export type ProductsFastTransfer = Readonly<{
  product: Product[];
}>;
