import { createAction, props } from '@ngrx/store';
import { IBanksPse } from '../../entities/banks-pse.interface';

export enum TypeAction {
  LOAD_BANKS = '[PAYMENT FD] - Load B anks',
  SUCCESS_BANKS = '[PAYMENT FD] - Success Banks',
  FAIL_BANKS = '[PAYMENT FD] - Fail Banks',
  RESET_BANKS = '[PAYMENT FD] - Reset Banks',
}

export const loadBanksPseAction = createAction(TypeAction.LOAD_BANKS);

export const successBanksPseAction = createAction(
  TypeAction.SUCCESS_BANKS,
  props<{ banks: IBanksPse[] }>(),
);

export const failBanksPseAction = createAction(
  TypeAction.FAIL_BANKS,
  props<{ errorMessage: string }>(),
);

export const resetBanksPseAction = createAction(TypeAction.RESET_BANKS);
