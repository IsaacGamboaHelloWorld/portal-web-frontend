import { Product } from '@core/models/products/product';
import { isNullOrUndefined } from 'util';

export function loadAmount(
  product: Product,
  text: string,
  amount: string,
  textLoading: string,
): string {
  if (product.loading && isNullOrUndefined(amount)) {
    return `- ${textLoading}...`;
  } else if (product.loaded || !isNullOrUndefined(amount)) {
    return `- ${text} ${amount}`;
  } else {
    return '';
  }
}
