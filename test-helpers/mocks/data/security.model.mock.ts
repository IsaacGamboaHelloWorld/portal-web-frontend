import { Injectable } from '@angular/core';
import { NavigateSecurity } from '@app/modules/security-ds/constants/navigate-security';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  BlockChannelCreateSuccess,
  BlockChannelGetSuccess,
} from '../data/security.access-control.mock';

@Injectable()
export class SecurityModelMock {
  public accessControlData$: BehaviorSubject<any> = new BehaviorSubject({});

  private innerGetAccessControl: any = BlockChannelGetSuccess;
  set setInnerGetAccessControl(data: any) {
    this.innerGetAccessControl = data;
    this.getAccessControl$.next(data);
    this.getAccessControl$.complete();
  }
  get getInnerGetAccessControl(): Observable<any> {
    return this.innerGetAccessControl;
  }

  private innerCudAccessControl: any = {
    data: BlockChannelCreateSuccess,
  };
  set setInnerCudAccessControl(data: any) {
    const _data = {
      data,
    };
    this.innerCudAccessControl = _data;
    this.cudAccessControl$.next(_data);
    this.cudAccessControl$.complete();
  }
  get getInnerCudAccessControl(): Observable<any> {
    return this.innerCudAccessControl;
  }
  public getAccessControl$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerGetAccessControl,
  );
  public cudAccessControl$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerCudAccessControl,
  );

  public hourSession$: BehaviorSubject<any> = new BehaviorSubject({});

  public getStep$: BehaviorSubject<any> = new BehaviorSubject({});

  public getAccessControlLoad(): void {}
  public getAccessControlReset(): void {}
  public cudAccessControlCreate(_PB: boolean, _BM: boolean): void {}
  public cudAccessControlUpdate(_PB: boolean, _BM: boolean): void {}
  public cudAccessControlDelete(): void {}
  public cudAccessControlReset(): void {}

  public setStep(_navigate: NavigateSecurity): void {}

  public notificationOpen(
    _message: string = '',
    _autoClosed: boolean = false,
    _typeNotification: string = '',
    _hideClose: boolean = false,
    _subMessage: string = '',
  ): void {}

  public notificationClosed(): void {}
}
