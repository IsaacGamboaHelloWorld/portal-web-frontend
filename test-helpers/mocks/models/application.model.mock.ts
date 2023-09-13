import { Injectable } from '@angular/core';
import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { INotificationMMState } from '@app/store/reducers/global/notification-multiple-message/notification-multiple-message.reducer';
import { INotificationState } from '@store/reducers/global/notification/notification.reducer';
import { BehaviorSubject } from 'rxjs';
import { getSecureMdmMock } from '../data/code-auth.mock';
import { responseOptionsModuleMock } from '../data/options-modules.mock';
import { unusualOperationsQuerySuccess } from '../data/unusual-operations.mock';

@Injectable()
export class ApplicationModelMock {
  public isLoadedLogin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public products$: BehaviorSubject<object> = new BehaviorSubject({});
  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userInfoData$: BehaviorSubject<
    UserSecureDataMdmResponse
  > = new BehaviorSubject(getSecureMdmMock);
  public hourSession$: BehaviorSubject<string> = new BehaviorSubject(
    '2018-02-16T17:00:00Z',
  );
  public notification$: BehaviorSubject<
    INotificationState
  > = new BehaviorSubject({
    message: 'Hello',
    autoClosed: true,
    open: true,
    typeNotification: 'error',
    hideClose: true,
    subMessage: '',
  });

  public notificationMM$: BehaviorSubject<
    INotificationMMState
  > = new BehaviorSubject({
    dataMessage: {},
    open: true,
    typeNotification: 'error',
    firstMessage: true,
    overwriteMessage: 'another',
  });

  private innerOptionModule: any = responseOptionsModuleMock;
  set setInnerOptionModule(data: any) {
    this.innerOptionModule = data;
    this.optionModule$.next(data);
  }
  get getInnerOptionModule(): any {
    return this.innerOptionModule;
  }
  public optionModule$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerOptionModule,
  );

  public optionsModule$: BehaviorSubject<any> = new BehaviorSubject(
    responseOptionsModuleMock,
  );

  public unusualOperationsQuery$: BehaviorSubject<any> = new BehaviorSubject(
    unusualOperationsQuerySuccess,
  );

  public fetchProducts(): void {}
  public resetProducts(): void {}
  public notificationOpen(): void {}
  public notificationClosed(): void {}
  public notificationReset(): void {}
  public notificationMMOpen(): void {}
  public notificationMMClosed(): void {}
  public notificationMMReset(): void {}
  public showAnimate(): void {}
  public fetchDetailProduct(): void {}
  public resetProduct(): void {}
  public fetchUnusualOperationsQueryLoad(): void {}
  public fetchUnusualOperationsQueryReset(): void {}
  public fetchUnusualOperationsApproveLoad(_body: any): void {}
  public fetchUnusualOperationsApproveReset(): void {}
}
