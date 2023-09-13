import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditEducationDataComponent } from './components/edit-profile/components/sections/edit-education-data/edit-education-data.component';
import { EditEmploymentDataComponent } from './components/edit-profile/components/sections/edit-employment-data/edit-employment-data.component';
import { EditFinancialDataComponent } from './components/edit-profile/components/sections/edit-financial-data/edit-financial-data.component';
import { EditPersonalDataComponent } from './components/edit-profile/components/sections/edit-personal-data/edit-personal-data.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ProfileComponent } from './profile.component';
import { PROFILE_ROUTES } from './util/routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: PROFILE_ROUTES.home,
        component: ProfileComponent,
        children: [
          {
            path: PROFILE_ROUTES.home,
            component: HomeProfileComponent,
          },
          {
            path: PROFILE_ROUTES.view,
            component: ViewProfileComponent,
          },
          {
            path: PROFILE_ROUTES.editPersonalData,
            component: EditPersonalDataComponent,
          },
          {
            path: PROFILE_ROUTES.editEducationData,
            component: EditEducationDataComponent,
          },
          {
            path: PROFILE_ROUTES.editFinancialData,
            component: EditFinancialDataComponent,
          },
          {
            path: PROFILE_ROUTES.editEmploymentData,
            component: EditEmploymentDataComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
