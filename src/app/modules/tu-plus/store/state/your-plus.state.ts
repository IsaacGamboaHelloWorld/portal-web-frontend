import { Product } from '@app/core/models/products/product';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { StepLineTime } from '../../entities/your-plus.interface';
import { IConfiguration } from '../reducers/configuration.reducer';
import { IHistoricMovements } from '../reducers/historic-movements.reducer';
import { IOTPGeneration } from '../reducers/otp-generation.reducer';
import { IRedemption } from '../reducers/redemption.reducer';

export const YourPlusName = 'YourPlusState';

export const ProdsFeatureName = 'models';
export interface IYourPlusState {
  step: StepLineTime;
  historicMovements: IHistoricMovements;
  configuration: IConfiguration;
  redemption: IRedemption;
  otpGeneration: IOTPGeneration;
}

export type ProductsRedemption = Readonly<{
  product: Product[];
}>;

export type ActiveProdHomeState = Readonly<{
  productActive: IProductActive;
}>;
