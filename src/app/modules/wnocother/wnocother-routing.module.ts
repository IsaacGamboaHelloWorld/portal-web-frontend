import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WnocotherContainer } from '@modules/wnocother/wnocother.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: WnocotherContainer,
        children: [
          {
            path: 'tipo',
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
            path: 'confirmar',
            loadChildren: () =>
              import('./components/step-three/step-three.module').then(
                (m) => m.StepThreeModule,
              ),
          },
          {
            path: 'exitoso',
            loadChildren: () =>
              import('./components/step-four/step-four.module').then(
                (m) => m.StepFourModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WnocotherRoutingModule {}
