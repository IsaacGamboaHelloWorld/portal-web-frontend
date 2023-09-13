import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { advanceRootRoute } from '@modules/advance/constants/routes';
import { StepService } from '@modules/advance/services/step.service';

@Injectable()
export class StepGuard implements CanActivate {
  constructor(private stepService: StepService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return of(null).pipe(
      delay(50),
      tap(() => {
        if (this.stepService.step <= 1) {
          this.router.navigate([`/${advanceRootRoute}`]);
          this.stepService.setStep(1);
        }
      }),
      map(() => true),
    );
  }
}
