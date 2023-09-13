import { createSelector } from '@ngrx/store';
import { isNullOrUndefined } from 'util';
import { ProductsInterface } from '../../core/interfaces/products.interface';
import { Product } from '../../core/models/products/product';

function mapProducts(
  _products: ProductsInterface,
  _detail: Product[],
): ProductsInterface {
  if (isNullOrUndefined(_products)) {
    return _products;
  }

  const productsMapped = {};

  Object.keys(_products).forEach((key) => {
    productsMapped[key] = _detail.filter((_item) => _item.typeAccount === key);
  });

  return productsMapped;
}

const products = (store) => store.models.products.types_account;

const product = (store) => store.models.product;

export const productsSelector = createSelector(products, product, mapProducts);
