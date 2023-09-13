import { Product } from '../products/product';

export interface AvalpayPaymentRequest {
  productFrom: Product;
  trazability: string;
}
