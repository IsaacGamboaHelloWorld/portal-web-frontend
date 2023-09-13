import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CurrencyFormatPipe } from '@app/core/pipes/currency-format/currency-format.pipe';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { SectionHeaderComponent } from './components/edit-profile/components/section-header/section-header.component';
import { EditContactDataComponent } from './components/edit-profile/components/sections/edit-contact-data/edit-contact-data.component';
import { EditEducationDataComponent } from './components/edit-profile/components/sections/edit-education-data/edit-education-data.component';
import { EditEmploymentDataComponent } from './components/edit-profile/components/sections/edit-employment-data/edit-employment-data.component';
import { EditFinancialDataComponent } from './components/edit-profile/components/sections/edit-financial-data/edit-financial-data.component';
import { EditPersonalDataComponent } from './components/edit-profile/components/sections/edit-personal-data/edit-personal-data.component';
import { ActionCardComponent } from './components/home-profile/components/action-card/action-card.component';
import { ProfileCardComponent } from './components/home-profile/components/profile-card/profile-card.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { ContactDataComponent } from './components/view-profile/components/contact-data/contact-data.component';
import { EducationDataComponent } from './components/view-profile/components/education-data/education-data.component';
import { EmploymentDataComponent } from './components/view-profile/components/employment-data/employment-data.component';
import { FinancialDataComponent } from './components/view-profile/components/financial-data/financial-data.component';
import { PersonalDataComponent } from './components/view-profile/components/personal-data/personal-data.component';
import { SectionCardComponent } from './components/view-profile/components/section-card/section-card.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LoadCatalogService } from './services/load-catalog.service';
import { UpdateProfileService } from './services/update-profile.service';
import { LoadCustomerProfileCatalogEffect } from './store/effects/load-catalog.effects';
import { UpdateCustomerProfileEffect } from './store/effects/update-profile.effects';
import { ProfileModel } from './store/model/profile.model';
import { CustomerProfileReducers } from './store/reducers';
import {
  CustomerProfileFeatureName,
  FEATURE_PROFILE_REDUCER_FEATURE,
} from './store/state/profile.state';

@NgModule({
  declarations: [
    HomeProfileComponent,
    ProfileCardComponent,
    ActionCardComponent,
    ViewProfileComponent,
    ProfileComponent,
    SectionCardComponent,
    SectionHeaderComponent,
    EditPersonalDataComponent,
    EditEducationDataComponent,
    EditEmploymentDataComponent,
    EditFinancialDataComponent,
    EditContactDataComponent,
    PersonalDataComponent,
    ContactDataComponent,
    EducationDataComponent,
    EmploymentDataComponent,
    FinancialDataComponent,
  ],
  exports: [SectionCardComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    CalendarModule,
    NgSelectModule,
    TemplateSystemModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(
      CustomerProfileFeatureName,
      FEATURE_PROFILE_REDUCER_FEATURE,
    ),
    EffectsModule.forFeature([
      LoadCustomerProfileCatalogEffect,
      UpdateCustomerProfileEffect,
    ]),
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ProfileModel,
    LoadCatalogService,
    UpdateProfileService,
    CurrencyFormatPipe,
    {
      provide: FEATURE_PROFILE_REDUCER_FEATURE,
      useValue: CustomerProfileReducers,
    },
  ],
  entryComponents: [EditEmploymentDataComponent],
})
export class ProfileModule {}
