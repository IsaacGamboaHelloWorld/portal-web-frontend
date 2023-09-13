import { MfaResponse } from './mfa-response.interface';

export class ChallengeEvent {
  constructor(readonly data: MfaResponse) {}
}

export class UnsuccessfulChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export class SuccessfulChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export class RequiredChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export class ResponsedChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export class CancelChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export class SelectChallenge extends ChallengeEvent {
  constructor(readonly data: MfaResponse) {
    super(data);
  }
}

export type ChallengeEvents =
  | ChallengeEvent
  | SuccessfulChallenge
  | RequiredChallenge
  | CancelChallenge
  | SelectChallenge;
