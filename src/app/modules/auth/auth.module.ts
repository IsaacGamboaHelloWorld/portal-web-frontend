import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { AuthComponent } from './auth.component';
import { ModalAlertsComponent } from './components/enrollment/components/modal-alerts/modal-alerts.component';

@NgModule({
  declarations: [AuthComponent, ModalAlertsComponent],
  imports: [
    CommonModule,
    CoreModule,
    ModalModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./components/login/login.module').then(
                (m) => m.LoginModule,
              ),
          },
          {
            path: 'enrolamiento',
            loadChildren: () =>
              import('./components/enrollment/enrollment.module').then(
                (m) => m.EnrollmentModule,
              ),
          },
        ],
      },
    ]),
  ],
  providers: [TealiumUtagService, ModalService],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ModalAlertsComponent],
})
export class AuthModule {}
