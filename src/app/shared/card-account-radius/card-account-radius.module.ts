import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelRadioButtonModule } from '../label-radio-button/label-radio-button.module';
import { CoreModule } from './../../core/core.module';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';
import { CardAccountRadiusComponent } from './card-account-radius.component';

@NgModule({
  declarations: [CardAccountRadiusComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    LabelRadioButtonModule,
  ],
  providers: [ManipulateDomService],
  exports: [CardAccountRadiusComponent],
})
export class CardAccountRadiusModule {}
