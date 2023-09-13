import { IBankElement } from '@core/interfaces/banks.interface';
import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';
import { Product } from '@core/models/products/product';

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
