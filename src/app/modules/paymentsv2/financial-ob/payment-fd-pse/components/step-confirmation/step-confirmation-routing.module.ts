import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StepConfirmationComponent } from './step-confirmation.component';

const routes: Routes = [{ path: '', component: StepConfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepConfirmationRoutingModule {}
