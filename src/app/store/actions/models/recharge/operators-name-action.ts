import { createAction } from '@ngrx/store';

import { IOperator } from '@modules/recharge-phone/entities/operatators';

const enum TYPE_ACTIONS {
  LOAD = '[Recharge] Load Operators',
  FAIL = '[Recharge] Fail Operators',
  SUCCESS = '[Recharge] Success Operators',
}

export const OperatorsLoad = createAction(TYPE_ACTIONS.LOAD);
export const OperatorsFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const OperatorsSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (operators: IOperator[]) => ({ operators }),
);
