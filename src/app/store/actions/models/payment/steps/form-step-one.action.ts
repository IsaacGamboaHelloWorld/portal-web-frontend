import { Action } from '@ngrx/store';

import { LoanObject } from '@app/core/interfaces/loan.interface';
import { Product } from '@app/core/models/products/product';
import { IBankElement } from '../../../../../core/interfaces/banks.interface';

export const PAYMENT_SET_FORM_STEP_ONE = '[Account Payment] Form Step One';
export const PAYMENT_RESET_FORM_STEP_ONE =
  '[Account Payment] Form Reset Step One';

export class FormStepOneAction implements Action {
  readonly type: string = PAYMENT_SET_FORM_STEP_ONE;

  constructor(
    public ownership: string,
    public ownershipIdType: string,
    public ownershipIdNumber: string,
    public account_origin: Product,
    public account_destination: LoanObject,
    public bank: IBankElement,
    public productType: string,
    public loanType: string,
    public accountIdentifier: string,
    public name: string,
    public isNew: boolean,
  ) {}
}

export class FormResetStepOneAction implements Action {
  readonly type: string = PAYMENT_RESET_FORM_STEP_ONE;
}

export type actions = FormStepOneAction | FormResetStepOneAction;
