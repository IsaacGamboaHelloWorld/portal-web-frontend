import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { NavigateLimitManagement } from './constants/navigate-limit-management';
import { LimitManagementComponent } from './limit-management.component';

const routes: Routes = [
  {
    path: NavigateLimitManagement.home,
    component: LimitManagementComponent,
    children: [
      {
        path: NavigateLimitManagement.home,
        component: HomeComponent,
      },
      {
        path: NavigateLimitManagement.onboarding,
        component: OnboardingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitManagementRoutingModule {}
