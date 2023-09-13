import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';
import { SplitFirstPipe } from '@app/core/pipes/utils/split-first.pipe';
import { CurrencyFormatPipe } from '@core/pipes/currency-format/currency-format.pipe';
import { FileCdnPipe } from '@core/pipes/file-cdn/file-cdn.pipe';
import { ImageCdnPipe } from '@core/pipes/image-cdn/image-cdn.pipe';
import { LoadAmountPipe } from '@core/pipes/load-amount.pipe';
import { CurrencyModule } from '../src/app/shared/currency/currency.module';

const routesPath: any[] = [
  {
    path: 'login',
    redirectTo: '/',
  },
  {
    path: 'transferencia',
    redirectTo: '/',
  },
  {
    path: 'avance',
    redirectTo: '/',
  },
  {
    path: 'documentos',
    redirectTo: '/',
  },
  {
    path: 'documentos-ds',
    redirectTo: '/',
  },
  {
    path: 'contacto',
    redirectTo: '/',
  },
  {
    path: 'perfil',
    redirectTo: '/',
  },
  {
    path: 'security',
    redirectTo: '/',
  },
  {
    path: 'totp',
    redirectTo: '/',
  },
  {
    path: 'totp/registro',
    redirectTo: '/',
  },
  {
    path: 'bloqueos',
    redirectTo: '/',
  },
  {
    path: 'codigo-2fa',
    redirectTo: '/',
  },
  {
    path: 'cambiar-password',
    redirectTo: '/',
  },
  {
    path: 'giros',
    redirectTo: '/',
  },
  {
    path: 'recargas',
    redirectTo: '/',
  },
  {
    path: 'bolsillos',
    redirectTo: '/',
  },
  {
    path: 'activar-tarjeta/crear',
    redirectTo: '/',
  },
  {
    path: 'pagos',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/obligacion-inscrita',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pagar/quien',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pagar/cuanto',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pagar/cuando',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pagar/confirmar',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pagar/exitoso',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pse/desde',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pse/datos',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pse/valor',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pse/confirmar',
    redirectTo: '/',
  },
  {
    path: 'pagos/ob-bancaria/pse/exitoso',
    redirectTo: '/',
  },
  {
    path: 'pagos/servicios',
    redirectTo: '/',
  },
  {
    path: 'pagos/servicios/pagar/desde',
    redirectTo: '/',
  },
  {
    path: 'pagos/servicios/pagar/cuanto',
    redirectTo: '/',
  },
  {
    path: 'pagos/servicios/pagar/confirmar',
    redirectTo: '/',
  },
  {
    path: 'pagos/servicios/pagar/exitoso',
    redirectTo: '/',
  },
  {
    path: 'pagos-impuestos',
    redirectTo: '/',
  },
  {
    path: 'pago-pila',
    redirectTo: '/',
  },
  {
    path: 'alertas-y-notificaciones',
    redirectTo: '/',
  },
  {
    path: 'detalle/free_destination',
    redirectTo: '/',
  },
  {
    path: 'detalle/deposit_account/krleklrkelrkelkslkds',
    redirectTo: '/',
  },
  {
    path: 'seguridad/administracion-topes',
    redirectTo: '/',
  },
  {
    path: 'tu-plus',
    redirectTo: '/',
  },
  {
    path: 'tu-plus/como',
    redirectTo: '/',
  },
  {
    path: 'tu-plus/como/redimir',
    redirectTo: '/',
  },
  {
    path: 'home',
    redirectTo: '/',
  },
];
@NgModule({
  imports: [
    RouterTestingModule.withRoutes(routesPath),
    TranslateModule.forRoot(),
    CurrencyModule.forRoot(),
    RouterModule.forRoot(routesPath),
  ],
  exports: [
    TranslateModule,
    RouterTestingModule,
    CurrencyFormatPipe,
    ImageCdnPipe,
    SplitFirstPipe,
    FileCdnPipe,
    LoadAmountPipe,
  ],
  declarations: [
    CurrencyFormatPipe,
    ImageCdnPipe,
    SplitFirstPipe,
    FileCdnPipe,
    LoadAmountPipe,
  ],
  providers: [{ provide: 'isMobile', useValue: false }],
})
export class TestingModule {}
