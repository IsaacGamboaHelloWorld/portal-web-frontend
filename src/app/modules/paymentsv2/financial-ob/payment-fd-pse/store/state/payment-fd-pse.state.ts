import { ISetFormThree } from '../../entities/step-form-three.interface';
import { ISetFormTwo } from '../../entities/step-form-two.interface';
import { IBanksPseData, initBanks } from '../reducers/banks-pse.reducers';
import { initFormOneFd } from '../reducers/form-one.reducers';
import { initFormThreeFd } from '../reducers/form-three.reducers';
import { IInitPaymentPse, initPaymentPse } from '../reducers/init-pse.reducers';
import { initStatusPse, IStatusPse } from '../reducers/status-pse.reducers';
import { ISetFormOne } from './../../entities/step-form-one.interface';
import { initFormTwoFd } from './../reducers/form-two.reducers';
import { initSetLineTime } from './../reducers/step.reducers';

export const paymentObFreeDestiantionFeatureKey =
  'paymentObFreeDestiantionState';

export interface IPaymentObFreeDestiantionState {
  lineTime: IStepLineTime;
  formOne: ISetFormOne;
  formTwo: ISetFormTwo;
  formThree: ISetFormThree;
  banks: IBanksPseData;
  initPayment: IInitPaymentPse;
  statusPayment: IStatusPse;
}

export interface IStepLineTime {
  step: number;
}

export const initPaymentFreeDestination: IPaymentObFreeDestiantionState = {
  lineTime: initSetLineTime,
  formOne: initFormOneFd,
  formTwo: initFormTwoFd,
  formThree: initFormThreeFd,
  banks: initBanks,
  initPayment: initPaymentPse,
  statusPayment: initStatusPse,
};
