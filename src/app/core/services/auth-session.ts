import { Injectable } from '@angular/core';
import { SecurityService } from '@app/modules/security/services/security.service';
import { CURRENT_USER } from '@core/constants/auth';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthSession {
  constructor(private securityService: SecurityService) {}

  public hasTokenData(): boolean {
    return !isNullOrUndefined(this.securityService.getItem(CURRENT_USER));
  }

  public getToken(): string {
    return this.securityService.getItem(CURRENT_USER) || '';
  }

  public saveTokenData(token: string): void {
    this.securityService.setItem(CURRENT_USER, token.toString());
  }
}
