import { LoanObject } from '@app/core/interfaces/loan.interface';
import { Product } from '@app/core/models/products/product';
import * as fromStepOne from '@store/actions/models/payment/steps/form-step-one.action';
import { IBankElement } from '../../../../../core/interfaces/banks.interface';
import { PaymentBillsInterface } from '../../../../../core/interfaces/paymentBills.interface';

export interface FormStepOneState {
  ownership: string;
  ownershipIdType: string;
  ownershipIdNumber: string;
  account_origin: Product;
  account_destination: LoanObject | PaymentBillsInterface;
  bank: IBankElement;
  productType: string;
  loanType: string;
  accountIdentifier: string;
  name: string;
  isNew: boolean;
}

export const initFormStepOne: FormStepOneState = {
  ownership: null,
  ownershipIdType: null,
  ownershipIdNumber: null,
  account_origin: null,
  account_destination: null,
  bank: null,
  productType: null,
  loanType: null,
  accountIdentifier: '',
  name: '',
  isNew: false,
};

export function formStepOneReducer(
  state: FormStepOneState = initFormStepOne,
  action: fromStepOne.actions,
): FormStepOneState {
  switch (action.type) {
    case fromStepOne.PAYMENT_SET_FORM_STEP_ONE:
      const actionData = action as fromStepOne.FormStepOneAction;

      return {
        ownership: actionData.ownership,
        ownershipIdType: actionData.ownershipIdType,
        ownershipIdNumber: actionData.ownershipIdNumber,
        account_origin: actionData.account_origin,
        account_destination: actionData.account_destination,
        bank: actionData.bank,
        productType: actionData.productType,
        loanType: actionData.loanType,
        accountIdentifier: actionData.accountIdentifier,
        name: actionData.name,
        isNew: actionData.isNew,
      };

    case fromStepOne.PAYMENT_RESET_FORM_STEP_ONE:
      return initFormStepOne;

    default:
      return state;
  }
}
