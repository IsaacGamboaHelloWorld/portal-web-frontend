import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtractsComponent } from './extracts.component';

const routes: Routes = [
  {
    path: '',
    component: ExtractsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtractsRoutingModule {}
