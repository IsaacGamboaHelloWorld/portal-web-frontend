import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TributaryComponent } from './tributary.component';

const routes: Routes = [
  {
    path: '',
    component: TributaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TributaryRoutingModule {}
