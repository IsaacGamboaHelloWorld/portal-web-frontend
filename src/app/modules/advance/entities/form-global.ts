import { Product } from '@core/models/products/product';

export interface IFormGlobal {
  origin: Product;
  destination: Product;
  amount: number;
  description: string;
  date: any;
  month: string;
  year: string;
  fees: number;
}
