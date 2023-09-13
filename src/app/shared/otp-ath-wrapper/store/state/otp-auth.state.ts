import { IGenericState } from '@app/core/interfaces';
import { OtpAthOperations } from '../../constants/otp-ath-operations.enum';
import { IOtpAthGenereateData, IOtpAthValidateData } from '../../entites';
import { initOtpAthGenerate } from '../reducers/otp-ath-generate.reducers';
import { initOtpAthModalFlow } from '../reducers/otp-ath-modal-flow.reducers';
import { initOtpAthModal } from '../reducers/otp-ath-modal.reducers';
import { initOtpAthValidate } from '../reducers/otp-ath-validate.reducers';

export const otpAthFeatureName = 'otpAthModuleState';

export interface IOtpAthModuleState {
  generate: IOtpAthGenerate;
  validate: IOtpAthValidate;
  modal: IOtpAthModal;
  flow: IOtpAthModalFlow;
}

export const initOtpAthState: IOtpAthModuleState = {
  generate: initOtpAthGenerate,
  validate: initOtpAthValidate,
  modal: initOtpAthModal,
  flow: initOtpAthModalFlow,
};

export interface IOtpAthGenerate extends IGenericState {
  data: IOtpAthGenereateData;
}

export interface IOtpAthValidate extends IGenericState {
  data: IOtpAthValidateData;
}

export interface IOtpAthModal {
  open: boolean;
  transactionType: OtpAthOperations;
}

export interface IOtpAthModalFlow {
  success: boolean;
}
