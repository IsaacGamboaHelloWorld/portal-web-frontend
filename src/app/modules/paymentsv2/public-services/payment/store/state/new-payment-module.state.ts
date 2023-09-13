import { Product } from '../../../../../../core/models/products/product';
import { ISetPayment } from '../../../entities/public-services';
import {
  IPaymentFormOne,
  IPaymentFormTwo,
  ISuccessServicePayment,
} from '../../entities/new-payment';

export const NewPaymentFeatureName = 'NewPaymentModuleState';
export const PublicServHomeFeatureName = 'PublicServiceModuleState';
export const ProdsFeatureName = 'models';

export type PaymentNewState = Readonly<{
  formOne: IPaymentFormOne;
  formTwo: IPaymentFormTwo;
  returnedInfo: ISuccessServicePayment;
  backHome: boolean;
}>;

export type ProductsNewState = Readonly<{
  product: Product[];
}>;

export type ActiveProductState = Readonly<{
  setPayment: ISetPayment;
}>;
