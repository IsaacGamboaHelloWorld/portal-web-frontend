import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepSixComponent } from './step-six.component';

const routes: Routes = [{ path: '', component: StepSixComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepSixRoutingModule {}
