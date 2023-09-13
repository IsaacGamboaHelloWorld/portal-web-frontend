import { STEPS } from '@app/modules/auth-old/constants/steps';

export class UserData {
  token?: string;
  lastAuthDate?: string;
  clientName?: string;
  currentDate?: string;
  lastIpAddress?: string;
  description?: string;
  processId?: string;
  step?: string;
  secureDataBriefQuestion?: SecureDataBriefQuestion;
  sdsPasswordValidation?: string;
  errorMessage?: string;
  success?: boolean;
  optionsModules?: any;
  hasFingerprintEnabled?: boolean;
  rawId?: any;
  experian?: any;
  request?: {
    ipAddress: string;
  };
  progressBar?: {
    description: string;
    percent: string;
  };

  static operationSuccess(user: UserData): boolean {
    return !!user.success && user.success;
  }
  static loginSuccess(user: UserData): boolean {
    return STEPS.COMPLETED === user.step;
  }
  static isOnServiceErrorOrAnAllowedErrorStep(user: UserData): boolean {
    return (
      STEPS.DOES_NOT_EXISTS === user.step ||
      STEPS.LIMIT_EXCEED_ON_OTP_GENERATION === user.step ||
      STEPS.LIMIT_EXCEED_ON_SECURE_DATA_GENERATION === user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_CREATE_OR_MIGRATE_USER_CREDENTIALS ===
        user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_FILL_CREDENTIALS === user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION === user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP === user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_USER_TASK === user.step ||
      STEPS.RETRIES_LIMIT_EXCEED_ON_FILL_ENROLLMENT_OTP === user.step ||
      (STEPS.EXPERIAN_FLOW === user.step && user.experian['step'] === 'ERROR')
    );
  }
}

export class SecureDataBriefQuestion {
  length?: number;
  question?: string;
  accountType?: string;
  questionType?: string;
  productType?: string;
}
