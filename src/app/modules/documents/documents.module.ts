import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./components/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'extractos',
        loadChildren: () =>
          import('./components/extracts/extracts.module').then(
            (m) => m.ExtractsModule,
          ),
      },
      {
        path: 'certificados-productos',
        loadChildren: () =>
          import('./components/certificate/certificate.module').then(
            (m) => m.CertificateModule,
          ),
      },
      {
        path: 'certificados-tributarios',
        loadChildren: () =>
          import('./components/tributary/tributary.module').then(
            (m) => m.TributaryModule,
          ),
      },
    ]),
  ],
})
export class DocumentsModule {}
