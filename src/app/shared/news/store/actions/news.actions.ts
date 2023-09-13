import { createAction } from '@ngrx/store';
import {
  IPrefsLoadResponse,
  IPrefsRequest,
  IPrefsResponse,
} from '../../entities/news';

const enum TypeActions {
  Load = '[LOAD PREFS / API] Load prefs Load',
  FAIL = '[LOAD PREFS / API] Load prefs Fail',
  SUCCESS = '[LOAD PREFS / API] Load prefs Success',
  RESET = '[LOAD PREFS / API] Load prefs Reset',
}

export const LoadPrefsLoad = createAction(TypeActions.Load);

export const LoadPrefsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const LoadPrefsSuccess = createAction(
  TypeActions.SUCCESS,
  (response: IPrefsLoadResponse) => ({ response }),
);
export const LoadPrefsReset = createAction(TypeActions.RESET);

const enum TypeActionsSave {
  Load = '[SAVE PREFS / API] Save prefs Load',
  FAIL = '[SAVE PREFS / API] Save prefs Fail',
  SUCCESS = '[SAVE PREFS / API] Save prefs Success',
  RESET = '[SAVE PREFS / API] Save prefs Reset',
}

export const SavePrefsLoad = createAction(
  TypeActionsSave.Load,
  (data: IPrefsRequest) => ({ data }),
);

export const SavePrefsFail = createAction(
  TypeActionsSave.FAIL,
  (description: string) => ({ description }),
);
export const SavePrefsSuccess = createAction(
  TypeActionsSave.SUCCESS,
  (response: IPrefsResponse) => ({ response }),
);
export const SavePrefsReset = createAction(TypeActionsSave.RESET);
