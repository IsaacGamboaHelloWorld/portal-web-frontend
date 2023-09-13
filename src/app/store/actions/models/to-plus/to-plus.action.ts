import { createAction } from '@ngrx/store';

import { IToPlus } from '@modules/main-container/constants/to-plus';

const enum TYPE_ACTIONS {
  LOAD = '[HOME] To Plus Load',
  FAIL = '[HOME] To Plus Fail',
  SUCCESS = '[HOME] To Plus Success',
}

export const ToPlusLoad = createAction(TYPE_ACTIONS.LOAD);
export const ToPlusFail = createAction(
  TYPE_ACTIONS.FAIL,
  (description: string) => ({ description }),
);
export const ToPlusSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  (toPlus: IToPlus) => ({ toPlus }),
);
