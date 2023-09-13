import { Injectable } from '@angular/core';
import { UserState } from '@app/store/reducers/global/auth/auth.reducer';
import { BehaviorSubject } from 'rxjs';
import { ApplicationModelMock } from './application.model.mock';

@Injectable()
export class AuthModelMock extends ApplicationModelMock {
  public isLoadingLogin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isErrorLogin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoadingPseData$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public payDataFail$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public enrollmentData$: BehaviorSubject<UserState> = new BehaviorSubject({
    data: {
      step: 'COMPLETED',
    },
  });
  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public payData$: BehaviorSubject<any> = new BehaviorSubject({});
  public listDesc$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public fetchUser(): void {}
  public resetUser(): void {}
  public resetProducts(): void {}
  public notificationReset(): void {}
  public fetchResetInfoUser(): void {}
  public logout(): void {}
  public rememberUser(userInfo: string): void {}
  public notificationOpen(): void {}
  public setStep(): void {}
}
