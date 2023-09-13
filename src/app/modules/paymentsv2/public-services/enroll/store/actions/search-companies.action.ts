import { createAction } from '@ngrx/store';
import { ICompanyListResponse } from '../../entities/enroll';

const enum TYPE_ACTIONS {
  LOAD = '[Search] Search company Load',
  SUCCESS = '[Search] Search company Success',
  FAIL = '[Search] Search company Fail',
  RESET = '[Search] Search company reset',
}

export const SearchCompanyLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (dataSend: string) => ({
    dataSend,
  }),
);

export const SearchCompanyFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const SearchCompanySuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (companies: ICompanyListResponse) => ({ companies }),
);

export const SearchCompanyResetAction = createAction(TYPE_ACTIONS.RESET);
