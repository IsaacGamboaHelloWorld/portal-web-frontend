import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IeVersionComponent } from '@modules/ie-version/ie-version.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: IeVersionComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class IeVersionRoutingModule {}
