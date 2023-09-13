import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environment';
import { Navigate } from '../constants/navigate';

@Injectable({
  providedIn: 'root',
})
export class OnlyLowEnvironmentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isProduction = !environment.lowEnviroments;
    if (isProduction) {
      this.router.navigate([Navigate.login]);
    }
    return !isProduction;
  }
}
