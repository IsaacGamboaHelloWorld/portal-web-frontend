import { Action } from './action-code';
import { Challenge } from './challenge-type';

export interface ChallengeResponse {
  action: Action;
  errorMessage?: string;
  challenges?: Challenge[];
  challengeInformation?: ChallengeInformation;
  response?: any;
  success: boolean;
  transactionId: string;
  url?: string;
  animation?: boolean;
}

export interface ChallengeInformation {
  resend?: Resend;
  challenge: Challenge;
  parameters?: any;
}

export interface Resend {
  enabled: boolean;
  time?: number;
}
