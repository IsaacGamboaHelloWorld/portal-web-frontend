import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StepFiveComponent } from './step-five.component';

const routes: Routes = [{ path: '', component: StepFiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepFiveRoutingModule {}
