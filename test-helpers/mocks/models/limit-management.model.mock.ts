import { BehaviorSubject } from 'rxjs';
import {
  limitManagementCreateSuccess,
  limitManagementGetWithData,
} from '../data/limit-management.mock';

export class LimitManagementModelMock {
  private innerLimitManagementGet: any = limitManagementGetWithData;
  set setInnerLimitManagementGet(data: any) {
    this.innerLimitManagementGet = data;
    this.limitManagementGet$.next(data);
  }
  get getInnerLimitManagementGet(): any {
    return this.innerLimitManagementGet;
  }
  public limitManagementGet$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerLimitManagementGet,
  );

  private innerLimitManagementCreate: any = limitManagementCreateSuccess;
  set setInnerLimitManagementCreate(data: any) {
    this.innerLimitManagementCreate = data;
    this.limitManagementCreate$.next(data);
  }
  get getInnerLimitManagementCreate(): any {
    return this.innerLimitManagementCreate;
  }
  public limitManagementCreate$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerLimitManagementCreate,
  );

  public limitManagementCreateLoad(_body: any): void {}
  public limitManagementCreateReset(): void {}
  public limitManagementGetLoad(_body: any): void {}
  public limitManagementGetReset(): void {}
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
