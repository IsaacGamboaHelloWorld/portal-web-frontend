import { createReducer, on } from '@ngrx/store';
import { ISetFormTwo } from '../../entities/step-form-two.interface';
import { setFormTwoAction } from '../actions/form-two.actions';
import { resetFormTwoAction } from './../actions/form-two.actions';

export const initFormTwoFd: ISetFormTwo = {
  type_person: null,
  bankId: null,
  bankName: null,
  email: null,
};

export const formTwoFdReducer = createReducer(
  initFormTwoFd,
  on(setFormTwoAction, (state, { form }) => {
    return {
      ...state,
      type_person: form.type_person,
      bankId: form.bankId,
      bankName: form.bankName,
      email: form.email,
    };
  }),
  on(resetFormTwoAction, (state) => {
    return initFormTwoFd;
  }),
);
