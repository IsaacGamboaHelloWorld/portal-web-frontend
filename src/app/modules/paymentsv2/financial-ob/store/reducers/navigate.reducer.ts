import { createReducer, on } from '@ngrx/store';
import { setFreeDestinationFlowAction } from '../actions/navigate.actions';
import { NavigationPaymentFlow } from '../state/financial-op-module.state';

export const initNavigagtionPaymentFlow: NavigationPaymentFlow = {
  isFreeDestination: false,
};

export const stepNavigationFlowReducer = createReducer(
  initNavigagtionPaymentFlow,
  on(setFreeDestinationFlowAction, (state, { isFreeDestination }) => {
    return {
      ...state,
      isFreeDestination,
    };
  }),
);
