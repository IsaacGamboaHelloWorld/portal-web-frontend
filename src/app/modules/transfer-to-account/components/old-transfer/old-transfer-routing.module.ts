import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OldTransferComponent } from './old-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: OldTransferComponent,
    children: [
      {
        path: 'a-quien',
        loadChildren: () =>
          import('./components/step-one/step-one.module').then(
            (m) => m.StepOneModule,
          ),
      },
      {
        path: 'por-cuanto',
        loadChildren: () =>
          import('./components/step-two/step-two.module').then(
            (m) => m.StepTwoModule,
          ),
      },
      {
        path: 'cuando',
        loadChildren: () =>
          import('./components/step-three/step-three.module').then(
            (m) => m.StepThreeModule,
          ),
      },
      {
        path: 'confirmacion',
        loadChildren: () =>
          import('./components/step-four/step-four.module').then(
            (m) => m.StepFourModule,
          ),
      },
      {
        path: 'exitosa',
        loadChildren: () =>
          import('./components/step-five/step-five.module').then(
            (m) => m.StepFiveModule,
          ),
      },
      {
        path: 'programada',
        loadChildren: () =>
          import('./components/step-six/step-six.module').then(
            (m) => m.StepSixModule,
          ),
      },
      {
        path: 'pendiente',
        loadChildren: () =>
          import('./components/step-seven/step-seven.module').then(
            (m) => m.StepSevenModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldTransferRoutingModule {}
