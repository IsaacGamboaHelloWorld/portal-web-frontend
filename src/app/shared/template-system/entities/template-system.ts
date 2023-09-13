import { Product } from '../../../core/models/products/product';
export interface ITemplateSystem {
  sectionActive: string;
  navigator: boolean;
  stepSystem: boolean;
  steps: number;
  activeProd: Product;
}
