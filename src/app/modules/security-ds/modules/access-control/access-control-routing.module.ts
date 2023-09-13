import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessControlContainerComponent } from './access-control-container.component';
import { AccessControlHomeComponent } from './components/access-control-home/access-control-home.component';

const routes: Routes = [
  {
    path: '',
    component: AccessControlContainerComponent,
    children: [
      {
        path: '',
        component: AccessControlHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessControlRoutingModule {}
