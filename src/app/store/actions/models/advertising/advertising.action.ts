import { AdvertisingInfo } from '@app/core/models/advertising/advertisingData';
import { createAction } from '@ngrx/store';

export const ToAdvertisingLoad = createAction(
  '[Advertising Home] Advertising Load',
);

export const advertisingSuccess = createAction(
  '[Advertising Home] Advertising  Success',
  (advertising: Map<string, AdvertisingInfo>) => ({ advertising }),
);

export const advertisingFailed = createAction(
  '[Advertising Home] Advertising Fail',
  (errorMessage: string) => ({ errorMessage }),
);
