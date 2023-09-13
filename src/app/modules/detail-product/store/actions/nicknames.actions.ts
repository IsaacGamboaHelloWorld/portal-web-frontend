import { createAction } from '@ngrx/store';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
  ISendNicknames,
} from '../../entities/nicknames';

/// All
const enum TYPE_ACTIONS_ALL {
  LOAD = '[Nicknames All] Load',
  FAIL = '[Nicknames All] Fail',
  SUCCESS = '[Nicknames All] Success',
  RESET = '[Nicknames All] Reset',
}

export const NicknamesAllLoad = createAction(TYPE_ACTIONS_ALL.LOAD);
export const NicknamesAllFail = createAction(
  TYPE_ACTIONS_ALL.FAIL,
  (description: string) => ({ description }),
);
export const NicknamesAllSuccess = createAction(
  TYPE_ACTIONS_ALL.SUCCESS,
  (data: INicknamesAll) => ({ data }),
);
export const NicknamesAllReset = createAction(TYPE_ACTIONS_ALL.RESET);
/// Create
const enum TYPE_ACTIONS_CREATE {
  LOAD = '[Nicknames Create] Load',
  FAIL = '[Nicknames Create] Fail',
  SUCCESS = '[Nicknames Create] Success',
  RESET = '[Nicknames Create] Reset',
}

export const NicknamesCreateLoad = createAction(
  TYPE_ACTIONS_CREATE.LOAD,
  (request: ISendNicknames) => ({ request }),
);
export const NicknamesCreateFail = createAction(
  TYPE_ACTIONS_CREATE.FAIL,
  (description: string) => ({ description }),
);
export const NicknamesCreateSuccess = createAction(
  TYPE_ACTIONS_CREATE.SUCCESS,
  (data: IAnswerNicknamesCreate) => ({ data }),
);
export const NicknamesCreateReset = createAction(TYPE_ACTIONS_CREATE.RESET);
/// Delete
const enum TYPE_ACTIONS_DELETE {
  LOAD = '[Nicknames Delete] Load',
  FAIL = '[Nicknames Delete] Fail',
  SUCCESS = '[Nicknames Delete] Success',
  RESET = '[Nicknames Delete] Reset',
}

export const NicknamesDeleteLoad = createAction(
  TYPE_ACTIONS_DELETE.LOAD,
  (request: ISendNicknames) => ({ request }),
);
export const NicknamesDeleteFail = createAction(
  TYPE_ACTIONS_DELETE.FAIL,
  (description: string) => ({ description }),
);
export const NicknamesDeleteSuccess = createAction(
  TYPE_ACTIONS_DELETE.SUCCESS,
  (data: IAnswerNicknamesDelete) => ({ data }),
);
export const NicknamesDeleteReset = createAction(TYPE_ACTIONS_DELETE.RESET);
/// Update
const enum TYPE_ACTIONS_UPDATE {
  LOAD = '[Nicknames Update] Load',
  FAIL = '[Nicknames Update] Fail',
  SUCCESS = '[Nicknames Update] Success',
  RESET = '[Nicknames Update] Reset',
}

export const NicknamesUpdateLoad = createAction(
  TYPE_ACTIONS_UPDATE.LOAD,
  (request: ISendNicknames) => ({ request }),
);
export const NicknamesUpdateFail = createAction(
  TYPE_ACTIONS_UPDATE.FAIL,
  (description: string) => ({ description }),
);
export const NicknamesUpdateSuccess = createAction(
  TYPE_ACTIONS_UPDATE.SUCCESS,
  (data: IAnswerNicknamesUpdate) => ({ data }),
);
export const NicknamesUpdateReset = createAction(TYPE_ACTIONS_UPDATE.RESET);
