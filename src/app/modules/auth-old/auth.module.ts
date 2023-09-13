import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { BarProgressModule } from '@app/shared/bar-progress/bar-progress.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { ExperianModule } from '@app/shared/experian/experian.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { WebAuthnModule } from '@app/shared/web-authn/web-authn.module';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { CoreModule } from '@core/core.module';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { EffectsModule } from '@ngrx/effects';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainer } from './auth.container';
import { AuthEffects } from './effects/password-auth.effects';
import { AcceptChannelPoliciesComponent } from './enrollment/components/accept-channel-policies/accept-channel-policies.component';
import { AlertComponent } from './enrollment/components/alert/alert.component';
import { EnrollmentExperianWrapperComponent } from './enrollment/components/enrollment-experian-wrapper/enrollment-experian-wrapper.component';
import { FillNewUniversalPasswordComponent } from './enrollment/components/fill-new-universal-password/fill-new-universal-password.component';
import { ModalAlertsComponent } from './enrollment/components/modal-alerts/modal-alerts.component';
import { ValidateCodeComponent } from './enrollment/components/validate-code/validate-code.component';
import { ValidateCurrentPasswordComponent } from './enrollment/components/validate-current-password/validate-current-password.component';
import { ValidateProductInformationComponent } from './enrollment/components/validate-product-information/validate-product-information.component';
import { ValidateUniversalPasswordComponent } from './enrollment/components/validate-universal-password/validate-universal-password.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthContainer,
    EnrollmentComponent,
    ValidateCurrentPasswordComponent,
    FillNewUniversalPasswordComponent,
    ValidateUniversalPasswordComponent,
    ValidateProductInformationComponent,
    ValidateCodeComponent,
    AlertComponent,
    AcceptChannelPoliciesComponent,
    EnrollmentExperianWrapperComponent,
    ModalAlertsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    CheckboxSlideModule,
    LineTimeModule,
    EffectsModule.forFeature([AuthEffects]),
    NgOtpInputModule,
    ModalModule,
    WebAuthnModule,
    DropdownModuleSelect,
    StateInputModule,
    ExperianModule,
    BarProgressModule,
  ],
  providers: [
    AuthModelOld,
    ModalService,
    ManipulateDomService,
    TealiumUtagService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ModalAlertsComponent],
})
export class AuthModule {}
