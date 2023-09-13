import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { DsDropdownSelectModule } from '@app/shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { EffectsModule } from '@ngrx/effects';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AuthEffects } from '../../store/effects/password-auth.effects';
import { AuthModel } from '../../store/model/auth.model';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    DropdownModuleSelect,
    DsDropdownSelectModule,
    DsInputModule,
    AutoCompleteModule,
    StateInputModule,
    CheckboxSlideModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthModel, ModalService, ManipulateDomService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
