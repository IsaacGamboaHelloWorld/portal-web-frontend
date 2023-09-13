import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TranslateModule } from '@ngx-translate/core';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TemplateSystemModule,
    CardChangeDataModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactComponent,
      },
    ]),
  ],
})
export class ContactModule {}
