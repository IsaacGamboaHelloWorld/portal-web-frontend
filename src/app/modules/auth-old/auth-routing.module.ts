import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/modules/auth-old/auth.container';
import { LoginComponent } from '@app/modules/auth-old/login/login.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthContainer,
        children: [
          {
            path: '',
            component: LoginComponent,
          },
          {
            path: 'enrolamiento',
            component: EnrollmentComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
