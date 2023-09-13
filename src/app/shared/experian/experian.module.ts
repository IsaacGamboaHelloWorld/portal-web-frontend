import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { NgOtpInputModule } from 'ng-otp-input';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EvidenteOtpComponent } from './components/evidente-otp/evidente-otp.component';
import { EvidenteQuestionnaireComponent } from './components/evidente-questionnaire/evidente-questionnaire.component';
import { ExperianErrorComponent } from './components/experian-error/experian-error.component';
import { ExperianLoadingComponent } from './components/experian-loading/experian-loading.component';
import { ExperianSuccessComponent } from './components/experian-success/experian-success.component';
import { ExperianComponent } from './experian.component';

@NgModule({
  declarations: [
    ExperianComponent,
    EvidenteOtpComponent,
    EvidenteQuestionnaireComponent,
    ExperianErrorComponent,
    ExperianSuccessComponent,
    ExperianLoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    CheckboxSlideModule,
    LineTimeModule,
    NgOtpInputModule,
    ModalModule,
    DropdownModuleSelect,
    StateInputModule,
    RadioButtonModule,
  ],
  providers: [ModalService, ManipulateDomService, TealiumUtagService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [ExperianComponent],
  entryComponents: [ExperianComponent],
})
export class ExperianModule {}
