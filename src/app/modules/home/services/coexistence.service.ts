import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from '@app/modules/security/services/security.service';
import { CURRENT_USER } from '@core/constants/auth';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class CoexistenceService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) {}

  public doGoOldPortal(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line
        Authorization: `Bearer ${this.securityService.getItem(CURRENT_USER)}`,
      }),
    };

    return this.http.get(
      environment.api.base + environment.api.services.coexistence,
      httpOptions,
    );
  }
}
