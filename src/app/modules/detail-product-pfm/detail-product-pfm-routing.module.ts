import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePFMComponent } from './components/home-pfm/home-pfm.component';
import { RecategorizationComponent } from './components/recategorization/recategorization.component';
import { NavigatePfm } from './constans/navigate-pfm';
import { DetailPfmContainer } from './detail-pfm.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPfmContainer,
    children: [
      {
        path: NavigatePfm.home,
        component: HomePFMComponent,
      },
      {
        path: NavigatePfm.recategorization,
        component: RecategorizationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProductPfmRoutingModule {}
