import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeContainer } from '@modules/home/home.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeContainer,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
