import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FastTransferComponent } from './fast-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: FastTransferComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/step-one/step-one.module').then(
            (m) => m.StepOneModule,
          ),
      },
      {
        path: 'confirmacion',
        loadChildren: () =>
          import('./components/step-two/step-two.module').then(
            (m) => m.StepTwoModule,
          ),
      },
      {
        path: 'exitosa',
        loadChildren: () =>
          import('./components/step-three/step-three.module').then(
            (m) => m.StepThreeModule,
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastTransferRoutingModule {}
