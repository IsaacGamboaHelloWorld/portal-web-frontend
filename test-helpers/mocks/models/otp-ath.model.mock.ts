import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  optAthGenerateSuccess,
  otpAthValidateSuccessMock,
} from '../data/otp-ath.mock';

@Injectable()
export class OtpAthModelMock {
  public generateOtpAth$: BehaviorSubject<any> = new BehaviorSubject({
    loading: false,
    loaded: false,
    success: false,
    errorMessage: '',
    data: optAthGenerateSuccess.otpData,
  });

  public validateOtpAth$: BehaviorSubject<any> = new BehaviorSubject({
    loading: false,
    loaded: false,
    success: false,
    errorMessage: '',
    data: otpAthValidateSuccessMock.validateOtpData,
  });

  public modalOtpAth$: BehaviorSubject<any> = new BehaviorSubject({
    open: false,
  });

  public modalFlowOtpAth$: BehaviorSubject<any> = new BehaviorSubject({
    success: true,
  });

  public otpAthGenerateLoad(_transactionType: any): void {}
  public otpAthGenerateReset(): void {}

  public otpAthValidateLoad(_request: any): void {}
  public otpAthValidateReset(): void {}

  public otpAthModalOpen(_transactionType: any): void {}
  public otpAthModalClose(): void {}

  public otpAthModalFlowSuccess(): void {}
  public otpAthModalFlowError(): void {}

  public notificationOpen(
    _message: string = '',
    _autoClosed: boolean = false,
    _typeNotification: string = '',
    _hideClose: boolean = false,
    _subMessage: string = '',
  ): void {}

  public notificationClosed(): void {}

  public notificationReset(): void {}
}
