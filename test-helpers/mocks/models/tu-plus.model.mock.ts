import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TuPlusModelMock {
  public step$: BehaviorSubject<number> = new BehaviorSubject(1);

  public historicMovement$: BehaviorSubject<any> = new BehaviorSubject({});

  public configuration$: BehaviorSubject<any> = new BehaviorSubject({});

  public redemption$: BehaviorSubject<any> = new BehaviorSubject({});

  public otpGeneration$: BehaviorSubject<any> = new BehaviorSubject({});

  public products$: BehaviorSubject<any> = new BehaviorSubject({});

  public setStep(step: number = 0): void {}

  public historicMovementLoad(
    startDt: string,
    endDt: string,
    isPagination: boolean,
    numPage: number,
  ): void {}
  public configurationLoad(Type: string): void {}
  public redemptionLoad(
    totalPoints: string,
    curAmt: string,
    accountId: string,
    accountType: string,
    bankId: string,
    bankName: string,
    otpValue?: string,
    spRefId?: string,
  ): void {}
  public otpGenerationLoad(): void {}

  public historicMovementReset(): void {}
  public configurationReset(): void {}
  public otpGenerationReset(): void {}
  public redemptionReset(): void {}

  public reset(): void {}

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {}
  public notificationClosed(): void {}

  public notificationReset(): void {}
}
