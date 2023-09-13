import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSecurityComponent } from './components/home-security/home-security.component';
import { NavigateSecurity } from './constants/navigate-security';
import { SecurityDsContainerComponent } from './security-ds-container.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityDsContainerComponent,
    children: [
      {
        path: NavigateSecurity.home,
        component: HomeSecurityComponent,
      },
    ],
  },
  {
    path: NavigateSecurity.access_control,
    loadChildren: () =>
      import('./modules/access-control/access-control.module').then(
        (m) => m.AccessControlModule,
      ),
  },
  {
    path: NavigateSecurity.limit_management,
    loadChildren: () =>
      import('./modules/limit-management/limit-management.module').then(
        (m) => m.LimitManagementModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityDsRoutingModule {}
