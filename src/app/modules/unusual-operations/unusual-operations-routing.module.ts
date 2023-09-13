import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsualOperationsComponent } from './components/unsual-operations/unsual-operations.component';
import { UnusualOperationsContainerComponent } from './unusual-operations-container.component';

const routes: Routes = [
  {
    path: '',
    component: UnusualOperationsContainerComponent,
    children: [
      {
        path: '',
        component: UnsualOperationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnusualesOperationRoutingModule {}
