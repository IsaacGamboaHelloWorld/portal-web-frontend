import { Product } from '@core/models/products/product';

export interface ProductsInterface {
  [key: string]: Product[];
}

export interface RespondServiceProducts {
  products: ProductsInterface;
  errorMessage: string;
  success: boolean;
}

export interface IRespOtherProducts {
  [key: string]: {
    errorMessage: string;
    success: boolean;
    products: ProductsInterface;
  };
}
