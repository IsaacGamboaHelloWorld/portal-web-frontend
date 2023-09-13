import { createAction } from '@ngrx/store';
import { IHistoricTransfer } from '../../entities/historic';

const enum TYPE_ACTIONS {
  LOAD = '[Account Transfer] Historic transfer Load',
  FAIL = '[Account Transfer] Historic transfer Fail',
  SUCCESS = '[Account Transfer] Historic transfer Success',
}

export const HistoricLoad = createAction(TYPE_ACTIONS.LOAD);

export const HistoricFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const HistoricSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (history: IHistoricTransfer[]) => ({ history }),
);
