import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFdPseContanier } from './payment-fd-pse.container';

const routes: Routes = [
  {
    path: '',
    component: PaymentFdPseContanier,
    children: [
      {
        path: 'desde',
        loadChildren: () =>
          import('./components/step-one/step-one.module').then(
            (m) => m.StepOneModule,
          ),
      },
      {
        path: 'datos',
        loadChildren: () =>
          import('./components/step-two/step-two.module').then(
            (m) => m.StepTwoModule,
          ),
      },
      {
        path: 'valor',
        loadChildren: () =>
          import('./components/step-three/step-three.module').then(
            (m) => m.StepThreeModule,
          ),
      },
      {
        path: 'confirmar',
        loadChildren: () =>
          import(
            // tslint:disable-next-line:trailing-comma
            './components/step-confirmation/step-confirmation.module'
          ).then((m) => m.StepConfirmationModule),
      },
      {
        path: 'exitoso',
        loadChildren: () =>
          import('./components/step-end/step-end.module').then(
            (m) => m.StepEndModule,
          ),
      },
      {
        path: '**',
        redirectTo: 'desde',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentFdPseRoutingModule {}
