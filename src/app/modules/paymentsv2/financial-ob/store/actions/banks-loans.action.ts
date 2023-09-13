import { createAction } from '@ngrx/store';
import { IBankElement } from '../../entities/financial-op';

const enum TYPE_ACTIONS {
  LOAD = '[BANKS] Load Banks Loans',
  SUCCESS = '[BANKS] Success Banks Loans',
  FAIL = '[BANKS] Error Banks Loans',
}

export const BanksLoansLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (bank: string) => ({ bank }),
);

export const BanksLoansSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (banksLoans: IBankElement) => ({ banksLoans }),
);

export const BanksLoansFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);
