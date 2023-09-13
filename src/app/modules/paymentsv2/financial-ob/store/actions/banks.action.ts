import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  LOAD = '[BANKS] Load Banks',
  SUCCESS = '[BANKS] Success Banks',
  FAIL = '[BANKS] Error Banks',
}

export const BanksLoadAction = createAction(TYPE_ACTIONS.LOAD);

export const BanksSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (banks: any) => ({ banks }),
);

export const BanksFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);
