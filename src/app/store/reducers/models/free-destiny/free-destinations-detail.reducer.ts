import { createReducer, on } from '@ngrx/store';
import {
  FreeDestination,
  FreeDestinationDetail,
} from '../../../../core/interfaces/free-destination.interface';
import * as fromFreeDestination from '../../../actions/models/free-destiny/free-destination-detail.actions';

export const initFreeDestinationDetails: FreeDestinationDetail[] = [];

export const freeDestinationsDetail = createReducer(
  initFreeDestinationDetails,
  on(
    fromFreeDestination.freeDestinyDetailLoad,
    (state, { accountIdentifier, freeDestiny }) => {
      if (!findProduct(state, accountIdentifier)) {
        return [
          ...state,
          {
            ...freeDestiny,
            accountIdentifier,
            loading: true,
            loaded: false,
            error: false,
            errorMessage: '',
          },
        ];
      }
      return state.map((data: FreeDestinationDetail) => {
        if (data.accountIdentifier === accountIdentifier) {
          return {
            ...data,
            loading: true,
            loaded: false,
            error: false,
            errorMessage: '',
          };
        } else {
          return data;
        }
      });
    },
  ),
  on(
    fromFreeDestination.freeDestinyDetailSuccess,
    (state, { accountIdentifier, freeDestiny }) => {
      return state.map((data: FreeDestinationDetail) => {
        if (data.accountIdentifier === accountIdentifier) {
          return {
            ...data,
            ...freeDestiny,
            loading: false,
            loaded: true,
            error: false,
            errorMessage: '',
          };
        } else {
          return data;
        }
      });
    },
  ),
  on(
    fromFreeDestination.freeDestinyDetailFail,
    (state, { accountIdentifier, errorMessage }) => {
      return state.map((data: FreeDestinationDetail) => {
        if (data.accountIdentifier === accountIdentifier) {
          return {
            ...data,
            loading: false,
            loaded: false,
            error: true,
            errorMessage,
          };
        } else {
          return data;
        }
      });
    },
  ),
);

function findProduct(state: any[], id: string): boolean {
  return (
    state.filter((data: FreeDestination) => data.accountIdentifier === id)
      .length > 0
  );
}
