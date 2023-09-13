import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainContainerComponent } from './main-container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainContainerComponent,
        children: [
          {
            path: 'induccion',
            loadChildren: () =>
              import('app/modules/onBoarding/onBoarding.module').then(
                (m) => m.OnBoardingModule,
              ),
          },
          {
            path: '',
            loadChildren: () =>
              import('app/modules/dashboard/dashboard.module').then(
                (m) => m.DashboardModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MainContainerRoutingModule {}
