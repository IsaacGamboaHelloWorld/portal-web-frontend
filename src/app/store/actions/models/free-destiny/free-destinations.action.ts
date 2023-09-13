import { createAction } from '@ngrx/store';
import { FreeDestination } from '../../../../core/interfaces/free-destination.interface';

export const freeDestinyAllLoad = createAction(
  '[Products Home] freeDestiny Load',
);
export const freeDestinyAllCancel = createAction(
  '[Products Home] freeDestiny Cancel',
);
export const freeDestinyAllSuccess = createAction(
  '[Products Home] freeDestiny Success',
  (freeDestinations: FreeDestination[]) => ({ freeDestinations }),
);
export const freeDestinyAllFailed = createAction(
  '[Products Home] freeDestiny Fail',
  (errorMessage: string) => ({ errorMessage }),
);
