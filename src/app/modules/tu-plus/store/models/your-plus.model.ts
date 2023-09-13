import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StepLineTime } from '../../entities/your-plus.interface';
import {
  ConfigurationActionLoad,
  ConfigurationActionReset,
} from '../actions/configuration.actions';
import {
  HistoricMovementsActionLoad,
  HistoricMovementsActionReset,
} from '../actions/historic-movements.actions';
import {
  OTPGenerationActionLoad,
  OTPGenerationActionReset,
} from '../actions/otp-generation.actions';
import {
  RedemptionActionLoad,
  RedemptionActionReset,
} from '../actions/redemption.actions';
import { SetStepYourPlus } from '../actions/step.actions';
import { IConfiguration } from '../reducers/configuration.reducer';
import { IHistoricMovements } from '../reducers/historic-movements.reducer';
import { IOTPGeneration } from '../reducers/otp-generation.reducer';
import { IRedemption } from '../reducers/redemption.reducer';
import {
  configurationSelector,
  historicMovementsSelector,
  otpGenerationSelector,
  redemptionSelector,
  selectProducts,
  selectStepSelector,
} from '../selectors/your-plus.selectors';

@Injectable()
export class YourPlusModel {
  constructor(protected store: Store<ApplicationState>) {}

  public step$: Observable<StepLineTime> = this.store.pipe(
    select(selectStepSelector),
  );
  public historicMovement$: Observable<IHistoricMovements> = this.store.pipe(
    select(historicMovementsSelector),
  );
  public configuration$: Observable<IConfiguration> = this.store.pipe(
    select(configurationSelector),
  );
  public redemption$: Observable<IRedemption> = this.store.pipe(
    select(redemptionSelector),
  );
  public otpGeneration$: Observable<IOTPGeneration> = this.store.pipe(
    select(otpGenerationSelector),
  );
  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepYourPlus({ step }));
    }, 1);
  }
  public historicMovementLoad(
    startDt: string,
    endDt: string,
    isPagination: boolean,
    numPage: number,
  ): void {
    this.store.dispatch(
      HistoricMovementsActionLoad({ startDt, endDt, isPagination, numPage }),
    );
  }
  public configurationLoad(Type: string): void {
    this.store.dispatch(ConfigurationActionLoad({ Type }));
  }
  public redemptionLoad(
    totalPoints: string,
    curAmt: string,
    accountId: string,
    accountType: string,
    bankId: string,
    bankName: string,
    otpValue?: string,
    spRefId?: string,
  ): void {
    this.store.dispatch(
      RedemptionActionLoad({
        totalPoints,
        curAmt,
        accountId,
        accountType,
        bankId,
        bankName,
        otpValue,
        spRefId,
      }),
    );
  }
  public otpGenerationLoad(): void {
    this.store.dispatch(OTPGenerationActionLoad());
  }

  // Reset
  public historicMovementReset(): void {
    this.store.dispatch(HistoricMovementsActionReset());
  }
  public configurationReset(): void {
    this.store.dispatch(ConfigurationActionReset());
  }
  public otpGenerationReset(): void {
    this.store.dispatch(OTPGenerationActionReset());
  }
  public redemptionReset(): void {
    this.store.dispatch(RedemptionActionReset());
  }
  public reset(): void {
    this.store.dispatch(HistoricMovementsActionReset());
    this.store.dispatch(ConfigurationActionReset());
    this.store.dispatch(OTPGenerationActionReset());
    this.store.dispatch(RedemptionActionReset());
  }

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
