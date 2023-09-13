import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { ExperianModule } from '@app/shared/experian/experian.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { WebAuthnModule } from '@app/shared/web-authn/web-authn.module';
import { EffectsModule } from '@ngrx/effects';
import { NgOtpInputModule } from 'ng-otp-input';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AuthEffects } from '../../store/effects/password-auth.effects';
import { AuthModel } from '../../store/model/auth.model';
import { AcceptChannelPoliciesComponent } from './components/accept-channel-policies/accept-channel-policies.component';
import { AlertComponent } from './components/alert/alert.component';
import { EnrollmentExperianWrapperComponent } from './components/enrollment-experian-wrapper/enrollment-experian-wrapper.component';
import { FillNewUniversalPasswordComponent } from './components/fill-new-universal-password/fill-new-universal-password.component';
import { InfoRegisterBiometricComponent } from './components/info-register-biometric/info-register-biometric.component';
import { RegisterBiometricComponent } from './components/register-biometric/register-biometric.component';
import { SetNameBiometricComponent } from './components/set-name-biometric/set-name-biometric.component';
import { ValidateCodeComponent } from './components/validate-code/validate-code.component';
import { ValidateCurrentPasswordComponent } from './components/validate-current-password/validate-current-password.component';
import { ValidateProductInformationComponent } from './components/validate-product-information/validate-product-information.component';
import { ValidateUniversalPasswordComponent } from './components/validate-universal-password/validate-universal-password.component';
import { EnrollmentComponent } from './enrollment.component';

@NgModule({
  declarations: [
    EnrollmentComponent,
    ValidateCurrentPasswordComponent,
    FillNewUniversalPasswordComponent,
    ValidateUniversalPasswordComponent,
    ValidateProductInformationComponent,
    ValidateCodeComponent,
    AlertComponent,
    AcceptChannelPoliciesComponent,
    RegisterBiometricComponent,
    InfoRegisterBiometricComponent,
    SetNameBiometricComponent,
    EnrollmentExperianWrapperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    AutoCompleteModule,
    StateInputModule,
    CheckboxSlideModule,
    LineTimeModule,
    NgOtpInputModule,
    ModalModule,
    WebAuthnModule,
    StateInputModule,
    DsInputModule,
    ExperianModule,
    RouterModule.forChild([
      {
        path: '',
        component: EnrollmentComponent,
      },
    ]),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthModel, ModalService, ManipulateDomService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EnrollmentModule {}
