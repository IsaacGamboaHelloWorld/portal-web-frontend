import { createReducer, on } from '@ngrx/store';

import { IBillerDetailResponse } from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';
import * as fromDetail from '@modules/paymentsv2/public-services/store/actions/biller-detail.action';
import { IAnswerInformation } from '../../entities/pay-stack';
import * as fromInformation from '../actions/information.actions';

export const initInformation: IAnswerInformation = {
  success: false,
  errorMessage: '',
  specificErrorMessage: null,
  approvalId: null,
  invoiceNumber: '',
  nie: '',
  amount: '',
  loading: false,
};

export const informationReducer = createReducer(
  initInformation,
  on(fromInformation.InformationLoad, (state) => {
    return {
      ...state,
      success: false,
      errorMessage: '',
      specificErrorMessage: null,
      approvalId: null,
      invoiceNumber: '',
      nie: '',
      amount: '',
      loading: true,
    };
  }),
  on(fromInformation.InformationSuccess, (state, { data }) => {
    return {
      success: data.success,
      errorMessage: data.errorMessage,
      specificErrorMessage: data.specificErrorMessage,
      approvalId: data.approvalId,
      invoiceNumber: data.invoiceNumber,
      nie: data.nie,
      amount: data.amount,
      loading: false,
    };
  }),
  on(fromInformation.InformationFail, (state, { description }) => {
    return {
      success: false,
      errorMessage: description,
      specificErrorMessage: null,
      approvalId: null,
      invoiceNumber: '',
      nie: '',
      amount: '',
      loading: false,
    };
  }),
  on(fromInformation.InformationReset, (state) => {
    return initInformation;
  }),
);

export interface BillerDetailState {
  data: IBillerDetailResponse;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
  description: string;
}

export const initData: BillerDetailState = {
  data: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null,
  description: null,
};

export const billerDetailReducer = createReducer(
  initData,
  on(fromDetail.BillerDetailLoad, (state) => {
    return {
      ...state,
      loaded: false,
      error: false,
      loading: true,
    };
  }),
  on(fromDetail.BillerDetailSuccess, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      error: false,
    };
  }),
  on(fromDetail.BillerDetailFail, (state, { description }) => {
    return {
      ...state,
      error: true,
      loading: false,
      loaded: false,
      description,
    };
  }),
  on(fromDetail.BillerDetailReset, (state) => {
    return initData;
  }),
);
