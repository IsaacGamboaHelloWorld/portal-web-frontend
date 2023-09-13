import { isNullOrUndefined } from 'util';

export function joinProducts(products: any): any[] {
  const allProducts = [];

  if (!isNullOrUndefined(products)) {
    for (const product in products) {
      if (products.hasOwnProperty(product)) {
        allProducts.push.apply(allProducts, products[product]);
      }
    }
  }

  return allProducts;
}
