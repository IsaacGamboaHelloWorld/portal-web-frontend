import {
  IRegisterProductAffiliation,
  OriginAccountRegistrationProduct,
} from '@core/interfaces/product-destination.interface';
import { createReducer, on } from '@ngrx/store';
import * as fromDestination from '../../../../actions/models/transfer/products-destination/register-affiliation.action';

export interface RegisterDestinationProductState {
  affiliationProduct: IRegisterProductAffiliation;
  products: OriginAccountRegistrationProduct[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initRegisterDestinationProduct: RegisterDestinationProductState = {
  affiliationProduct: null,
  products: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
};

export const registerDestinationProductReducer = createReducer(
  initRegisterDestinationProduct,
  on(fromDestination.LoadRegisterAffiliationApiOperation, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromDestination.RegisterAffiliationSuccess, (state) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromDestination.RegisterAffiliationError, (state, { errorMessage }) => {
    return {
      ...state,
      error: true,
      loading: false,
      loaded: false,
      errorMessage,
    };
  }),
  on(
    fromDestination.ResetRegisterAffiliation,
    (state) => initRegisterDestinationProduct,
  ),
);
