import { AdvertisingResponse } from '@app/core/models/advertising/advertisingData';
import { createReducer, on } from '@ngrx/store';
import * as advertisingAction from '@store/actions/models/advertising/advertising.action';

export const initAdvertising: AdvertisingResponse = {
  advertising: null,
  errorMessage: '',
  success: false,
};

export const advertisingtReducer = createReducer(
  initAdvertising,
  on(advertisingAction.ToAdvertisingLoad, (state) => {
    return {
      ...state,
      error: false,
      errorMessage: '',
    };
  }),

  on(advertisingAction.advertisingSuccess, (state, { advertising }) => {
    return {
      ...state,
      error: false,
      data: advertising,
    };
  }),
  on(advertisingAction.advertisingFailed, (state, { errorMessage }) => {
    return {
      ...state,
      error: true,
      errorMessage,
    };
  }),
);
