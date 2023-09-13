import { IFormOneTransferInterface } from '@core/interfaces/formOneTransfer.interface';
import * as fromStepOne from '@store/actions/models/transfer/steps/form-step-one.action';

export const initFormStepOne: IFormOneTransferInterface = {
  account_origin: null,
  account_destination: null,
  productType: null,
  bank: null,
  accountIdentifier: null,
  name: null,
  identificationType: null,
  identificationNumber: null,
};

export function formStepOneReducer(
  state: IFormOneTransferInterface = initFormStepOne,
  action: fromStepOne.actions,
): IFormOneTransferInterface {
  switch (action.type) {
    case fromStepOne.SET_FORM_STEP_ONE:
      const success = action as fromStepOne.FormStepOneAction;

      return {
        account_origin: success.formOne.account_origin,
        account_destination: success.formOne.account_destination,
        productType: success.formOne.productType,
        bank: success.formOne.bank,
        accountIdentifier: success.formOne.accountIdentifier,
        name: success.formOne.name,
        identificationType: success.formOne.identificationType,
        identificationNumber: success.formOne.identificationNumber,
      };

    case fromStepOne.RESET_FORM_STEP_ONE:
      return initFormStepOne;

    default:
      return state;
  }
}
