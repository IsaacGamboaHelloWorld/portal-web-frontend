import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { selectProducts } from '@app/modules/payment-taxes/store/selectors/payment-taxes.selector';
import {
  IBillerDetailRequest,
  IBillerDetailResponse,
} from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';
import {
  BillerDetailFail,
  BillerDetailLoad,
  BillerDetailReset,
} from '@app/modules/paymentsv2/public-services/store/actions/biller-detail.action';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/models/products/product';
import {
  IAnswerInformation,
  IAnswerPayRoll,
  IDatePayStack,
  IPayStackFormOne,
  IPayStackModuleState,
  ISendInformation,
  PilaPaymentRequest,
  PilaPaymentResponse,
  StepLineTime,
} from '../../entities/pay-stack';
import {
  ResetStepOnePayStack,
  SetDatePayStack,
  SetStepOnePayStack,
} from '../actions/formOne.action';
import {
  InformationFail,
  InformationLoad,
  InformationReset,
} from '../actions/information.actions';
import {
  PayStackFail,
  PayStackLoad,
  PayStackReset,
} from '../actions/pay-stack.actions';
import { PayrollLoad, PayrollReset } from '../actions/payroll.actions';
import { SetStepPayStack } from '../actions/step.actions';
import {
  selectDate,
  selectFormStepOne,
  selectInfoBiller,
  selectInfoPayStack,
  selectInformation,
  selectPayment,
  selectPayroll,
  selectStep,
} from '../selectors/pay-stack.selector';

@Injectable()
export class PayStackModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );
  public step$: Observable<StepLineTime> = this.store.pipe(select(selectStep));
  public stepOne$: Observable<IPayStackFormOne> = this.store.pipe(
    select(selectFormStepOne),
  );
  public date$: Observable<IDatePayStack> = this.store.pipe(select(selectDate));

  public statePayment$: Observable<PilaPaymentResponse> = this.store.pipe(
    select(selectPayment),
  );

  public statePayStack: Observable<IPayStackModuleState> = this.store.pipe(
    select(selectInfoPayStack),
  );

  public information: Observable<IAnswerInformation> = this.store.pipe(
    select(selectInformation),
  );
  public payroll: Observable<IAnswerPayRoll> = this.store.pipe(
    select(selectPayroll),
  );

  public selectedInfoBiller: Observable<
    IBillerDetailResponse
  > = this.store.pipe(select(selectInfoBiller));

  public creationFail(_data: string, specificErrorCode: string): void {
    this.store.dispatch(PayStackFail(_data, specificErrorCode));
  }

  public creationSucces(_data?: PilaPaymentRequest): void {
    this.store.dispatch(PayStackLoad(_data));
  }

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepPayStack(step));
    }, 1);
  }

  public setFormOne(_data: IPayStackFormOne): void {
    this.store.dispatch(SetStepOnePayStack(_data));
  }
  public setDate(_data: IDatePayStack): void {
    this.store.dispatch(SetDatePayStack(_data));
  }

  public getPayroll(id: string): void {
    this.store.dispatch(PayrollLoad(id));
  }
  public getInformation(data?: ISendInformation): void {
    this.store.dispatch(InformationLoad(data));
  }

  public failInformation(error?: string): void {
    this.store.dispatch(InformationFail(error));
  }

  public getInfoBill(_data: IBillerDetailRequest): void {
    this.store.dispatch(BillerDetailLoad(_data));
  }

  public failInfoBill(error?: string): void {
    this.store.dispatch(BillerDetailFail(error));
  }

  public resetInfoBill(): void {
    this.store.dispatch(BillerDetailReset());
  }

  public reset(): void {
    this.store.dispatch(ResetStepOnePayStack());
    this.store.dispatch(PayrollReset());
    this.cleanOnBackAction();
  }

  public cleanOnBackAction(): void {
    this.store.dispatch(InformationReset());
    this.store.dispatch(PayStackReset());
    this.store.dispatch(BillerDetailReset());
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
}
