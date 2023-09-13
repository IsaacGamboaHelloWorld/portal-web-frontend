import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPagesComponent } from '@modules/error-pages/error-pages.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ErrorPagesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
