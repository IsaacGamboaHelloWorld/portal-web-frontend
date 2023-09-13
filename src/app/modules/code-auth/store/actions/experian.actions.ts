import { createAction } from '@ngrx/store';

const enum TypeActionsAssign {
  LOAD = '[INVOKE EXPERIAN / API] Invoke experian flow',
  FAIL = '[EXPERIAN FAILED / API] Experian Flow Response failed',
  SUCCESS = '[EXPERIAN SUCCESS / API] Experian Flow Response success',
  RESET = '[EXPERIAN RESET / API] Reset Experian Flow State',
}

export const ExperianFlowLoad = createAction(
  TypeActionsAssign.LOAD,
  (data: any) => ({
    data,
  }),
);
export const ExperianFlowFail = createAction(
  TypeActionsAssign.FAIL,
  (data: any) => ({ data }),
);
export const ExperianFlowSuccess = createAction(
  TypeActionsAssign.SUCCESS,
  (data: any) => ({ data }),
);
export const ExperianFlowReset = createAction(TypeActionsAssign.RESET);
