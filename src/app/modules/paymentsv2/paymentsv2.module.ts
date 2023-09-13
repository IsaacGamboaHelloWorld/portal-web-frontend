import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Paymentsv2Container } from './paymentsv2.container';

@NgModule({
  declarations: [Paymentsv2Container],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./choose-history/choose-history.module').then(
            (m) => m.ChooseHistoryModule,
          ),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./public-services/public-services.module').then(
            (m) => m.PublicServicesModule,
          ),
      },
      {
        path: 'servicios/inscribir-servicio',
        loadChildren: () =>
          import('./public-services/enroll/enroll.module').then(
            (m) => m.EnrollPublicServiceModule,
          ),
      },
      {
        path: 'servicios/pagar',
        loadChildren: () =>
          import('./public-services/payment/payment.module').then(
            (m) => m.PaymentModule,
          ),
      },
      {
        path: 'servicios/servicio-inscrito',
        loadChildren: () =>
          import('./public-services/registered-sp/registered-sp.module').then(
            (m) => m.RegisteredSpModule,
          ),
      },
      {
        path: 'ob-bancaria',
        loadChildren: () =>
          import('./financial-ob/finantial-ob.module').then(
            (m) => m.FinantialObModule,
          ),
      },
      {
        path: 'ob-bancaria/inscribir-obligacion',
        loadChildren: () =>
          import('./financial-ob/enroll/enroll.module').then(
            (m) => m.EnrollFOModule,
          ),
      },
      {
        path: 'ob-bancaria/pagar',
        loadChildren: () =>
          import('./financial-ob/payment/payment.module').then(
            (m) => m.PaymentOFModule,
          ),
      },
      {
        path: 'ob-bancaria/obligacion-inscrita',
        loadChildren: () =>
          import('./financial-ob/registered-ob/registered-ob.module').then(
            (m) => m.RegisteredObModule,
          ),
      },
      {
        path: 'ob-bancaria/pse',
        loadChildren: () =>
          import('./financial-ob/payment-fd-pse/payment-fd-pse.module').then(
            (m) => m.PaymentFdPseModule,
          ),
      },
    ]),
  ],
})
export class Paymentsv2Module {}
