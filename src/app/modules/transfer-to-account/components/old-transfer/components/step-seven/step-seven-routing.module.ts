import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepSevenComponent } from './step-seven.component';

const routes: Routes = [{ path: '', component: StepSevenComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepSevenRoutingModule {}
