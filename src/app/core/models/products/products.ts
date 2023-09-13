import { Product } from '@core/models/products/product';

export class Products {
  products: {
    [key: string]: Product[];
  };
}
