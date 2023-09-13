import { ProductsInterface } from '@core/interfaces/products.interface';
import { createAction } from '@ngrx/store';

enum typeActions {
  LOAD = '[Other Product Home] Load',
  SUCCESS = '[Other Product Home] Success',
  FAIL = '[Other Product Home] Fail',
  SHOW = '[Other Product Home] Show Info',
}

export const otherProductLoad = createAction(
  typeActions.LOAD,
  (nameBank: string = null) => ({ nameBank }),
);
export const otherProductSuccess = createAction(
  typeActions.SUCCESS,
  (products: ProductsInterface, nameBank: string) => ({
    products,
    nameBank,
  }),
);
export const otherProductFail = createAction(
  typeActions.FAIL,
  (nameBank: string, errorMessage: string) => ({
    nameBank,
    errorMessage,
  }),
);
export const otherProductShow = createAction(
  typeActions.SHOW,
  (show: boolean) => ({ show }),
);
