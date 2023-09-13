import { Injectable } from '@angular/core';

import { ApplicationModel } from '@app/application.model';
import { AuthSession } from '@core/services/auth-session';

@Injectable()
export class AuthToken {
  constructor(private model: ApplicationModel, private auth: AuthSession) {}

  public checkInitToken(): void {
    this.model.setIsLogged(this.isAuth());
  }

  private isAuth(): boolean {
    return this.auth.hasTokenData();
  }
}
