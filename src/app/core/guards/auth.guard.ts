import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { ApplicationModel } from '@app/application.model';
import { Navigate } from '@core/constants/navigate';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private model: ApplicationModel) {}

  canActivate(): Observable<boolean> {
    return this.model.isLogged$.pipe(
      delay(50),
      filter((data) => !isNullOrUndefined(data)),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate([Navigate.login]);
        }
      }),
      map(() => true),
    );
  }
}
