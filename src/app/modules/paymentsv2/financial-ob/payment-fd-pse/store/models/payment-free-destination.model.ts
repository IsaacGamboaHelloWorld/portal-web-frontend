import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { Product } from '@app/core/models/products/product';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setPaymentProducts } from '../../../../public-services/payment/store/selectors/new-payment.selector';
import { IBanksPse } from '../../entities/banks-pse.interface';
import { IPaymentPseRequest } from '../../entities/payment-transaction-pse.interface';
import { IPaymentPseStatusResponse } from '../../entities/status-pse.interface';
import { ISetFormThree } from '../../entities/step-form-three.interface';
import { ISetFormTwo } from '../../entities/step-form-two.interface';
import {
  loadBanksPseAction,
  resetBanksPseAction,
} from '../actions/banks-pse.actions';
import {
  resetFormOneAction,
  setFormOneAction,
} from '../actions/form-one.actions';
import {
  resetFormTwoAction,
  setFormTwoAction,
} from '../actions/form-two.actions';
import {
  loadInitPseAction,
  resetInitPseAction,
} from '../actions/init-pse.actions';
import {
  loadStatusPseAction,
  resetStatusPseAction,
} from '../actions/status-pse.action';
import { ResetStepAction, SetStepAction } from '../actions/step.actions';
import { IBanksPseData } from '../reducers/banks-pse.reducers';
import { IInitPaymentPse } from '../reducers/init-pse.reducers';
import { IStatusPse } from '../reducers/status-pse.reducers';
import { selectFormThree, selectStep } from '../selectors/paymentObFd.selector';
import { ISetFormOne } from './../../entities/step-form-one.interface';
import {
  resetFormThreeAction,
  setFormThreeAction,
} from './../actions/form-three.actions';
import * as paymentObFdSelector from './../selectors/paymentObFd.selector';

@Injectable()
export class PaymentFreeDestinationModel extends ApplicationModel {
  public getStep$: Observable<number> = this.store.pipe(select(selectStep));

  public selectAllProducts$: Observable<Product[]> = this.store.pipe(
    select(setPaymentProducts),
  );

  public formOne$: Observable<ISetFormOne> = this.store.pipe(
    select(paymentObFdSelector.selectFormOne),
  );

  //#region "get module two"
  public formTwo$: Observable<ISetFormTwo> = this.store.pipe(
    select(paymentObFdSelector.selectFormTwo),
  );

  public selectBanksData$: Observable<IBanksPseData> = this.store.pipe(
    select(paymentObFdSelector.selectBanksData),
  );
  public selectBanks$: Observable<IBanksPse[]> = this.store.pipe(
    select(paymentObFdSelector.selectBanks),
  );

  //#endregion "get module two"

  public formThree$: Observable<ISetFormThree> = this.store.pipe(
    select(selectFormThree),
  );

  //#region "get module payment"
  public initPaymentPse$: Observable<IInitPaymentPse> = this.store.pipe(
    select(paymentObFdSelector.selectInitPaymentPse),
  );

  public statusPaymentPse$: Observable<IStatusPse> = this.store.pipe(
    select(paymentObFdSelector.selectStatusPaymentPse),
  );

  public statusPaymentDataPse$: Observable<
    IPaymentPseStatusResponse
  > = this.store.pipe(select(paymentObFdSelector.selectStatusPaymentDataPse));
  //#endregion "get module payment"

  public setStep(step: number): void {
    this.store.dispatch(SetStepAction({ step }));
  }

  public resetStep(): void {
    this.store.dispatch(ResetStepAction());
  }

  public setFormOne(form: ISetFormOne): void {
    this.store.dispatch(setFormOneAction({ form }));
  }

  public resetFormOne(): void {
    this.store.dispatch(resetFormOneAction());
  }

  //#region "dispatch module two"
  public fetchBanksPse(): void {
    this.store.dispatch(loadBanksPseAction());
  }

  public setFormTwo(form: ISetFormTwo): void {
    this.store.dispatch(setFormTwoAction({ form }));
  }

  public resetFormTwo(): void {
    this.store.dispatch(resetFormTwoAction());
  }

  public resetBanksPse(): void {
    this.store.dispatch(resetBanksPseAction());
  }
  //#endregion "dispatch module two"

  //#region "dispatch module three"
  public setFormThree(form: ISetFormThree): void {
    this.store.dispatch(setFormThreeAction({ form }));
  }

  public resetFormThree(): void {
    this.store.dispatch(resetFormThreeAction());
  }
  //#endregion "dispatch module three"

  //#region "get module payment"
  public fetchInitPaymentPse(body: IPaymentPseRequest): void {
    this.store.dispatch(loadInitPseAction({ body }));
  }

  public resetInitPaymentPse(): void {
    this.store.dispatch(resetInitPseAction());
  }

  public fetchStatusPaymentPse(paymentId: string): void {
    this.store.dispatch(loadStatusPseAction({ paymentId }));
  }

  public resetStatusPaymentPse(): void {
    this.store.dispatch(resetStatusPseAction());
  }
  //#endregion "get module payment"
}
