import { global } from './global';
import { models } from './models';

import * as auth from '@store/actions/global/auth/auth.action';
import { INITIAL_APPLICATION_STATE } from '@store/state/application.state';

const reducers = {
  global,
  models,
};

export const rootReducer = reducers;

export function clearState(reducer: any): any {
  return (state: any, action: any): any => {
    if (action.type === auth.LogOutAction.type) {
      state = INITIAL_APPLICATION_STATE;
    }

    return reducer(state, action);
  };
}
