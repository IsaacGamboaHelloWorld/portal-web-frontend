import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsDsComponent } from './documents-ds.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentsDsComponent,
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsDsRoutingModule {}
