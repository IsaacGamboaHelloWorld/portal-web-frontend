import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserProfileModelMock {
  public isLoadingChangePasswordCommand$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);

  public changePassword(data: any): void {}
}
