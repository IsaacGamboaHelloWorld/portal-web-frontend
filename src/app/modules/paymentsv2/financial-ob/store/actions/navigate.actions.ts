import { createAction, props } from '@ngrx/store';
const enum TYPE_ACTIONS {
  SET_FREE_DESTINATION_FLOW = '[NAV PAYMENT] Set Free destination flow',
}

export const setFreeDestinationFlowAction = createAction(
  TYPE_ACTIONS.SET_FREE_DESTINATION_FLOW,
  props<{ isFreeDestination: boolean }>(),
);
