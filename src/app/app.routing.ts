import { ExtraOptions, PreloadAllModules, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { LogguedGuard } from '@core/guards/loggued.guard';

export const ROOT_ROUTES: Routes = [
  {
    path: 'loginOld',
    loadChildren: () =>
      import('@app/modules/auth-old/auth.module').then((m) => m.AuthModule),
    canActivate: [LogguedGuard],
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('app/modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
  },
  {
    path: 'ieerror',
    loadChildren: () =>
      import('app/modules/ie-version/ie-version.module').then(
        (m) => m.IeVersionModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@app/modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LogguedGuard],
  },
  {
    path: 'errorpage/:errorid',
    loadChildren: () =>
      import('app/modules/error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('app/modules/main-container/main-container.module').then(
        (m) => m.MainContainerModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

export const ROOT_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  initialNavigation: 'enabled',
};
