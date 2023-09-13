import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StepEndComponent } from './step-end.component';

const routes: Routes = [{ path: '', component: StepEndComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepEndRoutingModule {}
