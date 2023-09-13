import { createAction, props } from '@ngrx/store';
import { ListTransaction } from '../../entities/historic-movements.interface';

const enum TypeActionsHistoryMovements {
  LOAD = '[HISTORIC MOVEMENTS / API] HistoricMovements Load',
  FAIL = '[HISTORIC MOVEMENTS / API] HistoricMovements Fail',
  SUCCESS = '[HISTORIC MOVEMENTS / API] HistoricMovements Success',
  RESET = '[HISTORIC MOVEMENTS / API] HistoricMovements Reset',
}
export const HistoricMovementsActionLoad = createAction(
  TypeActionsHistoryMovements.LOAD,
  props<{
    startDt: string;
    endDt: string;
    isPagination: boolean;
    numPage: number;
  }>(),
);

export const HistoricMovementsActionSuccess = createAction(
  TypeActionsHistoryMovements.SUCCESS,
  props<{ data: ListTransaction[] }>(),
);

export const HistoricMovementsActionFail = createAction(
  TypeActionsHistoryMovements.FAIL,
  props<{
    errorMessage: string;
    specificErrorMessage: string;
    errorMessageCode: number;
  }>(),
);

export const HistoricMovementsActionReset = createAction(
  TypeActionsHistoryMovements.RESET,
);
