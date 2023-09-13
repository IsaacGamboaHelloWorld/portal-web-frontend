import { IBankElement } from '@core/interfaces/banks.interface';
import { Product } from '@core/models/products/product';
import { IProductAffiliationElement } from './product-destination.interface';

export interface IFormOneTransferInterface {
  account_origin: Product;
  account_destination: IProductAffiliationElement;
  productType: string;
  bank: IBankElement;
  accountIdentifier: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
}
