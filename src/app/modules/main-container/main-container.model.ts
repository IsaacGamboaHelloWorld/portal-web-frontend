import { ApplicationModel } from '@app/application.model';
import { UserSecureDataLoadAction } from '@app/store/actions/global/user/user-get-secure-data-mdm.action';

import { ValidatePing } from '@store/actions/global/auth/auth-validate-ping.action';
import { ValidateSession } from '@store/actions/global/auth/auth-validate-session.action';
import { UserLoadAction } from '@store/actions/global/user/user.action';

export class MainContainerModel extends ApplicationModel {
  public fetchUserData(): void {
    this.store.dispatch(new UserLoadAction());
  }

  public ValidateSession(): void {
    this.store.dispatch(ValidateSession());
  }

  public ValidatePing(): void {
    this.store.dispatch(ValidatePing());
  }

  public fetchUserSecureData(): void {
    this.store.dispatch(new UserSecureDataLoadAction());
  }
}
