import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import {
  ResetStepOneRecharge,
  SetStepOneRecharge,
} from '@store/actions/models/recharge/form-step-one.action';
import { OperatorsLoad } from '@store/actions/models/recharge/operators-name-action';
import {
  RechargeLoad,
  RechargeReset,
} from '@store/actions/models/recharge/recharge-action';
import { setStepRecharge } from '@store/actions/models/recharge/step.action';
import { IOperators } from '@store/reducers/models/recharge/operators.reducer';
import { IRecharge } from '@store/reducers/models/recharge/recharge.reducer';

Injectable();
export class RechargeModel extends ApplicationModel {
  public operators$: Observable<IOperators> = this.store.pipe(
    select((store) => store.models.recharge.operators),
  );

  public step$: Observable<number> = this.store.pipe(
    select((store) => store.models.recharge.stepRecharge),
  );

  public formOne$: Observable<IFormOneRecharge> = this.store.pipe(
    select((store) => store.models.recharge.formOneRecharge),
  );

  public recharge$: Observable<IRecharge> = this.store.pipe(
    select((store) => store.models.recharge.rechargePhone),
  );

  public loadOperators(): void {
    this.store.dispatch(OperatorsLoad());
  }

  public setStep(step: number): void {
    this.store.dispatch(setStepRecharge(step));
  }

  public setFormOne(form: IFormOneRecharge): void {
    this.store.dispatch(SetStepOneRecharge(form));
  }

  public resetFormOne(): void {
    this.store.dispatch(ResetStepOneRecharge());
  }

  public recharge(form: IFormOneRecharge): void {
    this.store.dispatch(RechargeLoad(form));
  }

  public resetRecharge(): void {
    this.store.dispatch(RechargeReset());
  }

  public resetAllRecharge(): void {
    this.resetFormOne();
    this.resetRecharge();
    this.setStep(1);
  }
}
