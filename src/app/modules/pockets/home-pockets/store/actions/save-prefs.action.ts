import { createAction } from '@ngrx/store';
import { IPrefsRequest, IPrefsResponse } from '../../entities/home-pockets';

const enum TypeActions {
  Load = '[SAVE PREFS / API] Save prefs Load',
  FAIL = '[SAVE PREFS / API] Save prefs Fail',
  SUCCESS = '[SAVE PREFS / API] Save prefs Success',
  RESET = '[SAVE PREFS / API] Save prefs Reset',
}

export const SavePrefsLoad = createAction(
  TypeActions.Load,
  (data: IPrefsRequest) => ({ data }),
);

export const SavePrefsFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const SavePrefsSuccess = createAction(
  TypeActions.SUCCESS,
  (response: IPrefsResponse) => ({ response }),
);
export const SavePrefsReset = createAction(TypeActions.RESET);
