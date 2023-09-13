import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentsContainer } from '@modules/payments/payments.container';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PaymentsContainer,
        children: [
          {
            path: 'tipo-pago',
            component: ChooseTypeComponent,
          },
          {
            path: 'pagos-inscritos',
            component: AddPaymentComponent,
          },
          {
            path: 'nuevo-pago',
            component: NewPaymentComponent,
          },
          {
            path: '',
            loadChildren: () =>
              import('./home-payments/home-payments.module').then(
                (m) => m.HomePaymentsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
