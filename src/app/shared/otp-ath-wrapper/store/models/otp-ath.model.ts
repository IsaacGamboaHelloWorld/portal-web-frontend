import { Injectable } from '@angular/core';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OtpAthOperations } from '../../constants/otp-ath-operations.enum';
import { IOtpAthValidateRequest } from '../../entites';
import {
  OtpAthGenerateLoad,
  OtpAthGenerateReset,
  OtpAthModalClose,
  OtpAthModalFlowError,
  OtpAthModalFlowReset,
  OtpAthModalFlowSuccess,
  OtpAthModalOpen,
  OtpAthValidateLoad,
  OtpAthValidateReset,
} from '../actions';
import {
  OtpAthGenerateSelector,
  OtpAthModalFlowSelector,
  OtpAthModalSelector,
  OtpAthValidateSelector,
} from '../selectors';
import {
  IOtpAthGenerate,
  IOtpAthModal,
  IOtpAthModalFlow,
  IOtpAthValidate,
} from '../state/otp-auth.state';

@Injectable()
export class OtpAthModel {
  constructor(protected store: Store<ApplicationState>) {}

  public generateOtpAth$: Observable<IOtpAthGenerate> = this.store.pipe(
    select(OtpAthGenerateSelector),
  );

  public validateOtpAth$: Observable<IOtpAthValidate> = this.store.pipe(
    select(OtpAthValidateSelector),
  );

  public modalOtpAth$: Observable<IOtpAthModal> = this.store.pipe(
    select(OtpAthModalSelector),
  );

  public modalFlowOtpAth$: Observable<IOtpAthModalFlow> = this.store.pipe(
    select(OtpAthModalFlowSelector),
  );

  //#region "otpAthGenerate"
  public otpAthGenerateLoad(transactionType: OtpAthOperations): void {
    this.store.dispatch(OtpAthGenerateLoad({ transactionType }));
  }

  public otpAthGenerateReset(): void {
    this.store.dispatch(OtpAthGenerateReset());
  }
  //#endregion "otpAthGenerate"
  //#region "OtpAthValidate"
  public otpAthValidateLoad(request: IOtpAthValidateRequest): void {
    this.store.dispatch(OtpAthValidateLoad(request));
  }

  public otpAthValidateReset(): void {
    this.store.dispatch(OtpAthValidateReset());
  }
  //#endregion "OtpAthValidate"

  //#region "OtpAthModal"
  public otpAthModalOpen(transactionType: OtpAthOperations): void {
    this.store.dispatch(OtpAthModalOpen({ transactionType }));
  }

  public otpAthModalClose(): void {
    this.store.dispatch(OtpAthModalClose());
  }
  //#endregion "OtpAthModal"

  //#region "OtpAthModalFlow"
  public otpAthModalFlowSuccess(): void {
    this.store.dispatch(OtpAthModalFlowSuccess());
  }

  public otpAthModalFlowError(): void {
    this.store.dispatch(OtpAthModalFlowError());
  }

  public otpAthModalFlowReset(): void {
    this.store.dispatch(OtpAthModalFlowReset());
  }
  //#endregion "OtpAthModal"

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }

  public notificationReset(): void {
    this.store.dispatch(new NotificationResetAction());
  }
}
