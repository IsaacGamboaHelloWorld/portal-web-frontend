import { createAction } from '@ngrx/store';
import {
  FreeDestination,
  FreeDestinationDetail,
} from '../../../../core/interfaces/free-destination.interface';

export const freeDestinyDetailLoad = createAction(
  '[Home] freeDestiny Load',
  (accountIdentifier: string, freeDestiny: FreeDestination) => ({
    accountIdentifier,
    freeDestiny,
  }),
);
export const freeDestinyDetailSuccess = createAction(
  '[Home] freeDestiny detail success',
  (accountIdentifier: string, freeDestiny: FreeDestinationDetail) => ({
    accountIdentifier,
    freeDestiny,
  }),
);
export const freeDestinyDetailFail = createAction(
  '[Home] freeDestiny detail fail',
  (accountIdentifier: string, errorMessage: string) => ({
    accountIdentifier,
    errorMessage,
  }),
);
