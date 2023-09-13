import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { totpGenerateMock } from '../data/totp.mock';

@Injectable()
export class TotpModelMock {
  public generateTotp$: BehaviorSubject<any> = new BehaviorSubject({
    data: totpGenerateMock,
  });
  public registerTotp$: BehaviorSubject<any> = new BehaviorSubject({});
  public devicesTotp$: BehaviorSubject<any> = new BehaviorSubject({});
  public deleteTotp$: BehaviorSubject<any> = new BehaviorSubject({});

  public totpGenerateLoad(): void {}
  public totpGenerateReset(): void {}
  public totpRegisterLoad(
    _name: string,
    _totpId: string,
    _code: string,
  ): void {}
  public totpRegisterReset(): void {}
  public totpDevicesLoad(): void {}
  public totpDevicesReset(): void {}
  public totpDeleteLoad(_totpId: string): void {}
  public totpDeleteReset(): void {}
}
