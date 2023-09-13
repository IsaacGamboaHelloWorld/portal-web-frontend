import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvanceContainer } from '@modules/advance/advance.container';
import { AdvanceSuccessComponent } from '@modules/advance/components/advance-success/advance-success.component';
import { ConfirmationComponent } from '@modules/advance/components/confirmation/confirmation.component';
import { HowMuchComponent } from '@modules/advance/components/how-much/how-much.component';
import { ToWhoComponent } from '@modules/advance/components/to-who/to-who.component';
import { WhenComponent } from '@modules/advance/components/when/when.component';
import { StepGuard } from '@modules/advance/guards/step.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdvanceContainer,
        children: [
          {
            path: '',
            component: ToWhoComponent,
          },
          {
            path: 'por-cuanto',
            component: HowMuchComponent,
            canActivate: [StepGuard],
          },
          {
            path: 'cuando',
            component: WhenComponent,
            canActivate: [StepGuard],
          },
          {
            path: 'confirmacion',
            component: ConfirmationComponent,
            canActivate: [StepGuard],
          },
          {
            path: 'avance-exitoso',
            component: AdvanceSuccessComponent,
            canActivate: [StepGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdvanceRoutingModule {}
