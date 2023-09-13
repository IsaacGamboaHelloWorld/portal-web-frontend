import { createAction } from '@ngrx/store';
import { IPrefsLoadResponse } from '../../entities/home-pockets';

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
