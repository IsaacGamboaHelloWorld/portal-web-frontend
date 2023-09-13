export interface ICodeAuthModuleState {
  allowed: IAnswerAllowedCodeAuth;
  assignCode: IAnswerAssignCodeAuth;
  step: StepBar;
  getSecureData: IAnswerSecureData;
  updateSecureData: IAnswerUpdateSecureData;
  getQuestion: IAnswerGetQuestion;
  validQuestion: IAnswerSecureValidQuestion;
  experian: any;
  userSecureData: any;
}

export interface StepBar {
  step: number;
}
export interface IAnswerAllowedCodeAuth {
  enrollmentSecureData?: IEnrollmentData;
  success?: boolean;
  userAlreadyHasEnhanced?: boolean;
  errorMessage?: string;
  userAlreadyHasHard?: boolean;
}

export interface IEnrollmentData {
  enrollmentSecureData: ISecureData;
  success?: boolean;
  errorMessage?: string;
}
export interface ISecureData {
  secretId?: string;
  secret?: any;
  acctId?: string;
  acctType?: string;
  secureDataMessage?: string;
  secureDataLength?: number;
}

export interface ISendAssignCodeAuth {
  enrollmentSecureData?: ISecureAssignData;
}
export interface IUpdateSecureData {
  secureTelephone?: string;
  secureEmail?: string;
  contactPreference?: string;
}
export interface IAnswerUpdateSecureData {
  success: boolean;
  loading: boolean;
}
export interface IAnswerSecureData {
  secureEmail: string;
  secureTelephone: string;
  contactPreference: string;
  success: boolean;
  ComponentID: string;
  PartyAssociation: object[];
  loading: boolean;
  phoneNumber?: string;
  email?: string;
  ind?: string;
  shortName?: string;
  fullName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
  documentExpeditionDate?: string;
}

export interface ISecureAssignData {
  secretId?: string;
  secret?: any;
  acctId?: string;
  acctType?: string;
  secureDataLength?: number;
}

export interface IAnswerAssignCodeAuth {
  success?: boolean;
  errorMessage?: string;
  numberAttemps?: number;
  secureDataMessage?: string;
  loading?: boolean;
}
export interface IAnswerGetQuestion {
  success: boolean;
  errorMessage: string;
  enrollmentSecureData: EnrollSecureData;
  loading: boolean;
}

export interface EnrollSecureData {
  secretId: string;
  secret: string;
  acctId: string;
  acctType: string;
  secureDataMessage: string;
  secureDataLength: number;
}

export interface ISendEnrollSecureData {
  secretId: string;
  secret: string;
  acctId: string;
  acctType: string;
}

export interface IAnswerSecureValidQuestion {
  loading: boolean;
  success: boolean;
  errorStatusCode: string;
  errorMessage: string;
  specificErrorMessage: string;
}
export interface IAnswerSecureState {
  secondFactorAuth: string;
  errorCode: string;
  errorMessage: string;
  success: boolean;
  dateTime: string;
}
