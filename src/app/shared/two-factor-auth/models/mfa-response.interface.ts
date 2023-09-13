import { Action } from './action-code';
import { Challenge } from './challenge-type';

export interface MfaResponse {
  action: Action;
  errorMessage?: string;
  challenges?: Challenge[];
  challengeInformation?: ChallengeInformation;
  challengeResponses?: ChallengeResponse[];
  response?: any;
  success: boolean;
  transactionId: string;
  url?: string;
  animation?: boolean;
  request: any;
  dateTime: string;
}

export interface ChallengeInformation {
  resend?: Resend;
  challenge: Challenge;
  parameters?: any;
}

export interface ChallengeResponse {
  errorMessage?: string;
  response: any;
  success: boolean;
}

export interface Resend {
  enabled: boolean;
  time?: number;
}
