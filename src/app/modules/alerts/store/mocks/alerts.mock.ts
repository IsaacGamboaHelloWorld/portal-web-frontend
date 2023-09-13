import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IAlertFormOne,
  IAlertFormThree,
  IAlertFormTwo,
  ICreateUserAlertRequest,
} from '../../entities/alerts';
import { IUserAlertRequest } from '../../entities/user';
import { IHomeAlerts } from '../reducers/get-alerts.reducer';

@Injectable()
export class AlertsMock {
  private innerAllAlertsData?: any = null;

  get getInnerAllAlertsData(): any {
    return this.innerAllAlertsData;
  }
  set setInnerAllAlertsData(data: any) {
    this.innerAllAlertsData = data;
    this.allAlerts$.next(data);
  }

  public basicData$: BehaviorSubject<any> = new BehaviorSubject({});
  public allAlerts$: BehaviorSubject<IHomeAlerts> = new BehaviorSubject(
    this.innerAllAlertsData,
  );
  public financialitems$$: BehaviorSubject<object> = new BehaviorSubject({});
  public allFinancial$: BehaviorSubject<object> = new BehaviorSubject({});
  public infoUser$: BehaviorSubject<object> = new BehaviorSubject({
    email: 'asdvafdgafg',
    phoneNumber: '12345678',
  });
  public infoUserAlerts$: BehaviorSubject<object> = new BehaviorSubject({
    success: true,
    statusCode: 1,
    errorMessage: '',
    specificErrorMessage: '',
    data: [],
  });

  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public hasAlertUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public fetchAllAlerts(): void {}
  public fetchInfoUser(): void {}
  public fetchAllFinancialOps(): void {}
  public fetchAllBills(): void {}
  public clearAllFinancialOps(): void {}
  public clearAllBills(): void {}
  public fetchStepOne(_data: IAlertFormOne): void {}
  public fetchStepTwo(_data: IAlertFormTwo): void {}
  public fetchStepThree(_data: IAlertFormThree): void {}
  public fetchCreateAlert(_data: ICreateUserAlertRequest): void {}
  public setStep(step: number = 0): void {}
  public fetchUserAlert(_data: IUserAlertRequest): void {}
}
