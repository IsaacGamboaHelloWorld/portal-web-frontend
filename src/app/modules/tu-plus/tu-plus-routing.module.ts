import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuPlusComponent } from './tu-plus.component';

const routes: Routes = [
  {
    path: '',
    component: TuPlusComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/step-one/step-one.module').then(
            (m) => m.StepOneModule,
          ),
      },
      {
        path: 'como',
        loadChildren: () =>
          import('./components/step-two/step-two.module').then(
            (m) => m.StepTwoModule,
          ),
      },
      {
        path: 'como/redimir',
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
export class TuPlusRoutingModule {}
