import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface ExperianContractRequest {
  step?: string;
  documentExpeditionDate?: string;
  names?: string;
  lastName?: string;
  otpPhoneNumber?: string;
  otpCode?: string;
  idTransactionOtp?: string;
  idValidationRecord?: string;
  requiresQuestionnaire?: boolean;
  idQuestionnaire?: string;
  answers?: ExperianQuestionnaireAnswer[];
}

export interface ExperianContractResponse extends GenericResponse {
  idValidationRecord?: string;
  idTransactionOtp?: string;
  isValidNumber?: boolean;
  requiresQuestionnaire?: boolean;
  step?: string;
  questionnaire: ExperianQuestionnaire;
}

export interface ExperianQuestionnaireAnswer {
  idQuestion: string;
  idAnswer: string;
}

export interface ExperianQuestionnaire {
  id?: string;
  questions?: ExperianQuestions[];
}

export interface ExperianQuestions {
  idQuestion?: string;
  question?: string;
  answers?: ExperianQuestionnaireAnswerOption[];
}

export interface ExperianQuestionnaireAnswerOption {
  idAnswer?: string;
  description?: string;
}

export enum ExperianStates {
  INIT = 'INIT',
  FILL_OTP = 'FILL_OTP',
  FILL_QUESTIONNAIRE = 'FILL_QUESTIONNAIRE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IExperianStates {
  INIT: string;
  FILL_OTP: string;
  FILL_QUESTIONNAIRE: string;
  SUCCESS: string;
  ERROR: string;
}
