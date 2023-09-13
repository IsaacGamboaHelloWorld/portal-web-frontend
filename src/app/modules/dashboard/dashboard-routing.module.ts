import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from '@core/constants/routes';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: ROUTES,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
