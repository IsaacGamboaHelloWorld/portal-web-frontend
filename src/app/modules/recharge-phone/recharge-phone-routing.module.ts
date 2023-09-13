import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RechargePhoneContainer } from '@modules/recharge-phone/recharge-phone.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RechargePhoneContainer,
        children: [
          {
            path: 'recargar',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'confirmacion',
            loadChildren: () =>
              import(
                // tslint:disable-next-line:trailing-comma
                './components/recharge-confirmation/recharge-confirmation.module'
              ).then((m) => m.RechargeConfirmationModule),
          },
          {
            path: 'exito',
            loadChildren: () =>
              import(
                // tslint:disable-next-line:trailing-comma
                './components/recharge-success/recharge-success.module'
              ).then((m) => m.RechargeSuccessModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RechargePhoneRoutingModule {}
