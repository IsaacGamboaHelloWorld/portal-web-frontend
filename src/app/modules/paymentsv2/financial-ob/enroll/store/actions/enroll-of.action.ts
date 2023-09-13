import { createAction } from '@ngrx/store';
import {
  IFinancialObRequest,
  IFinancialObResponse,
} from '../../../entities/financial-op';

const enum TYPE_ACTIONS {
  LOAD = '[ENROLL] Load enroll financial',
  SUCCESS = '[ENROLL] Success enroll financial',
  FAIL = '[ENROLL] Fail enroll financial',
  RESET = '[ENROLL] Reset enroll financial',
}

export const EnrollOFLoadAction = createAction(
  TYPE_ACTIONS.LOAD,
  (_data: IFinancialObRequest) => ({ _data }),
);

export const EnrollOFSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (response: IFinancialObResponse) => ({ response }),
);

export const EnrollOFsFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const EnrollOFsResetAction = createAction(TYPE_ACTIONS.RESET);
