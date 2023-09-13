import { OnlyLowEnvironmentGuard } from '../guards/only-low-environment.guard';

export const ROUTES = [
  {
    path: '',
    loadChildren: () =>
      import('app/modules/home/home.module').then((m) => m.HomeModule),
  },
  //#region "Left Menu"
  {
    path: 'pagos',
    loadChildren: () =>
      import('app/modules/paymentsv2/paymentsv2.module').then(
        (m) => m.Paymentsv2Module,
      ),
  },
  {
    path: 'transferencia',
    loadChildren: () =>
      import('app/modules/transfer-to-account/transfer-to-account.module').then(
        (m) => m.TransferToAccountModule,
      ),
  },
  {
    path: 'documentos',
    loadChildren: () =>
      import('@app/modules/documents/documents.module').then(
        (m) => m.DocumentsModule,
      ),
  },
  {
    path: 'documentos-ds',
    loadChildren: () =>
      import('@app/modules/documents-ds/documents-ds.module').then(
        (m) => m.DocumentsDsModule,
      ),
  },
  //#endregion "Left Menu"
  //#region "Top Menu"
  {
    path: 'contacto',
    loadChildren: () =>
      import('@app/modules/contact/contact.module').then(
        (m) => m.ContactModule,
      ),
  },
  {
    path: 'apertura-productos',
    loadChildren: () =>
      import(
        // tslint:disable-next-line: trailing-comma
        '@app/modules/open-offers-products/open-offers-products.module'
      ).then((m) => m.OpenOffersProductsModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('@app/modules/profile/profile.module').then(
        (m) => m.ProfileModule,
      ),
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('app/modules/security-ds/security-ds.module').then(
        (m) => m.SecurityDsModule,
      ),
  },
  //#endregion "Top Menu"
  //#region "Payments Options"
  {
    path: 'pagos-impuestos',
    loadChildren: () =>
      import('app/modules/payment-taxes/payment-taxes.module').then(
        (m) => m.PaymentTaxesModule,
      ),
  },
  {
    path: 'pago-pila',
    loadChildren: () =>
      import('app/modules/pay-stack/pay-stack.module').then(
        (m) => m.PayStackModule,
      ),
  },
  //#endregion "Payments Options"
  //#region "Security Options"
  {
    path: 'alertas-y-notificaciones',
    loadChildren: () =>
      import('app/modules/alerts/alerts.module').then((m) => m.AlertsModule),
  },
  {
    path: 'activar-tarjeta',
    loadChildren: () =>
      import('app/modules/activate-tc/activate-tc.module').then(
        (m) => m.ActivateTcModule,
      ),
  },
  {
    path: 'bloqueos',
    loadChildren: () =>
      import('app/modules/blocked-products/blocked-products.module').then(
        (m) => m.BlockedproductsModule,
      ),
  },
  {
    path: 'codigo-2fa',
    loadChildren: () =>
      import('app/modules/code-auth/code-auth.module').then(
        (m) => m.CodeAuthModule,
      ),
  },
  {
    path: 'cambiar-password',
    loadChildren: () =>
      import('@app/modules/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule,
      ),
  },
  {
    path: 'biometrico',
    loadChildren: () =>
      import('app/modules/biometric/biometric.module').then(
        (m) => m.BiometricModule,
      ),
  },
  {
    path: 'totp',
    loadChildren: () =>
      import('app/modules/totp/totp.module').then((m) => m.TotpModule),
    canActivate: [OnlyLowEnvironmentGuard],
  },
  {
    path: 'operaciones-inusuales',
    loadChildren: () =>
      import('@app/modules/unusual-operations/unusuales-operation.module').then(
        (m) => m.UnusualOperationsModule,
      ),
  },
  //#endregion "Security Options"
  //#region "Product Detail Options"
  {
    path: 'detalle/:type/:id',
    loadChildren: () =>
      import('app/modules/detail-product/detail-product.module').then(
        (m) => m.DetailProductModule,
      ),
  },
  {
    path: 'detallePFM/:type/:id',
    loadChildren: () =>
      import('app/modules/detail-product-pfm/detail-product-pfm.module').then(
        (m) => m.DetailProductPfmModule,
      ),
  },
  {
    path: 'detallePFM',
    loadChildren: () =>
      import('app/modules/detail-product-pfm/detail-product-pfm.module').then(
        (m) => m.DetailProductPfmModule,
      ),
  },
  {
    path: 'giros',
    loadChildren: () =>
      import('app/modules/wnocother/wnocother.module').then(
        (m) => m.WnocotherModule,
      ),
  },
  {
    path: 'recargas',
    loadChildren: () =>
      import('app/modules/recharge-phone/recharge-phone.module').then(
        (m) => m.RechargePhoneModule,
      ),
  },
  {
    path: 'bolsillos',
    loadChildren: () =>
      import('app/modules/pockets/home-pockets/home-pockets.module').then(
        (m) => m.HomePocketsModule,
      ),
  },
  //#endregion "Product Detail Options"
  //#region "Pockets Options"
  {
    path: 'bolsillos/nuevo-bolsillo',
    loadChildren: () =>
      import('app/modules/pockets/new-pocket/new-pocket.module').then(
        (m) => m.NewPocketModule,
      ),
  },
  {
    path: 'bolsillos/editar-bolsillo',
    loadChildren: () =>
      import('app/modules/pockets/edit-pocket/edit-pocket.module').then(
        (m) => m.EditPocketModule,
      ),
  },
  {
    path: 'bolsillos/mover-dinero',
    loadChildren: () =>
      import('app/modules/pockets/move-pockets/move-pockets.module').then(
        (m) => m.MovePocketsModule,
      ),
  },
  //#endregion "Pockets Options"
  {
    path: 'avance',
    loadChildren: () =>
      import('app/modules/advance/advance.module').then((m) => m.AdvanceModule),
  },
  {
    path: 'tu-plus',
    loadChildren: () =>
      import('app/modules/tu-plus/tu-plus.module').then((m) => m.TuPlusModule),
  },
  {
    path: 'tu-organizador',
    loadChildren: () =>
      import('app/modules/organizer/organizer.module').then(
        (m) => m.OrganizerModule,
      ),
  },
];
