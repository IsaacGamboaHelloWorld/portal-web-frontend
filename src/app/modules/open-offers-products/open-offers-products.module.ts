import { CommonModule } from '@angular/common';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  providers: [HttpUrlEncodingCodec],
})
export class OpenOffersProductsModule {}
