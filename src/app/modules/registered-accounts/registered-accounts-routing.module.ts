import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRegisteredAccountsComponent } from './components/home-registered-accounts/home-registered-accounts.component';
import { RegisterAffiliationComponent } from './components/register-affiliation/register-affiliation.component';
import { RegisteredAccountsContainer } from './registered-accounts.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisteredAccountsContainer,
        children: [
          {
            path: 'inscribir',
            component: RegisterAffiliationComponent,
          },
          {
            path: '',
            component: HomeRegisteredAccountsComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisteredAccountsRoutingModule {}
