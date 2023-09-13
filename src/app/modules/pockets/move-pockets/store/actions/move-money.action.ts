import { createAction } from '@ngrx/store';
import { IMovePocketResp } from '../../entities/move-pockets';

const enum TypeActions {
  LOAD = '[MOVE MONEY POCKETS / API] Move money pockets Load',
  FAIL = '[MOVE MONEY POCKETS / API] Move money pockets Fail',
  SUCCESS = '[MOVE MONEY POCKETS / API] Move money pockets Success',
  RESET = '[MOVE MONEY POCKETS / API] Move money pockets Reset',
}

export const MoveMoneyPocketsLoad = createAction(
  TypeActions.LOAD,
  (data: any) => ({ data }),
);

export const MoveMoneyPocketsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);

export const MoveMoneyPocketsSuccess = createAction(
  TypeActions.SUCCESS,
  (pocketsData: IMovePocketResp) => ({ pocketsData }),
);
export const MoveMoneyPocketsReset = createAction(TypeActions.RESET);
