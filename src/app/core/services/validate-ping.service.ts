import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from '@app/modules/security/services/security.service';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatePingService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) {}

  public validatePing(): Observable<any> {
    return this.http.get(
      environment.api.base + environment.api.services.validatePing,
    );
  }
}
