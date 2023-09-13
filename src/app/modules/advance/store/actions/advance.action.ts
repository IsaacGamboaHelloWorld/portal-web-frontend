import { Product } from '@core/models/products/product';
import { IFormGlobal } from '@modules/advance/entities/form-global';
import { createAction } from '@ngrx/store';
import { IAdvanceResp } from '../../entities/advance';

export const setAdvanceToWho = createAction(
  '[HOME ADVANCE] Set To Who',
  (origin: Product, destination: Product) => ({ origin, destination }),
);

export const setAdvanceHowMuch = createAction(
  '[HOME ADVANCE] Set How Much',
  (
    amount: number,
    description: string,
    fees: number,
    year: string,
    month: string,
  ) => ({ amount, description, fees, month, year }),
);

export const setAdvanceWhen = createAction(
  '[HOME ADVANCE] Set When',
  (date: string) => ({ date }),
);

export const setAdvanceReset = createAction('[HOME ADVANCE] Set Reset');

export const fetchAdvanceLoad = createAction(
  '[HOME ADVANCE / API] Advance Load',
  (body: IFormGlobal) => ({ body }),
);

export const fetchAdvanceFail = createAction(
  '[HOME ADVANCE / API] Advance Fail',
  (errorMessage: string) => ({ errorMessage }),
);

export const fetchAdvanceSuccess = createAction(
  '[HOME ADVANCE / API] Advance Success',
  (payload: IAdvanceResp) => ({
    payload,
  }),
);

export const fetchAdvanceReset = createAction(
  '[HOME ADVANCE / API] Advance Reset',
);
