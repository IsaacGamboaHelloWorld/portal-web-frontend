import { Product } from '@app/core/models/products/product';
import { IProductActive } from '../../../../../../store/reducers/models/product-active/product-active.reducer';
import { ISetPayment } from '../../../entities/financial-op';
import {
  IPaymentFormOne,
  IPaymentFormTwo,
  ISuccessFinancialOb,
} from '../../entities/new-payment';

export const NewPaymentFOFeatureName = 'NewPaymentFOModuleState';
export const FinancialObHomeFeatureName = 'FinancialOpModuleState';
export const ProdsFeatureName = 'models';

export type ObligationNewState = Readonly<{
  formOne: IPaymentFormOne;
  formTwo: IPaymentFormTwo;
  formThree: any;
  returnedInfo: ISuccessFinancialOb;
  step: number;
  backHome: boolean;
}>;

export type ProductsNewState = Readonly<{
  product: Product[];
  productActive: IProductActive;
}>;

export type ActiveProductState = Readonly<{
  activePayment: ISetPayment;
}>;
