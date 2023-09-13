import { Product } from '@core/models/products/product';
import { IOperator } from '@modules/recharge-phone/entities/operatators';

export interface IFormOneRecharge {
  account_origin: Product;
  operator: IOperator;
  phone_number: number;
  amount: number | string;
}
