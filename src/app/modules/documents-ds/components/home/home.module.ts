import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { HomeModelDocuments } from '@app/modules/documents/store/model/home.model';
import { BtnSquareDsModule } from '@app/shared/btn-square-ds/btn-square-ds.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { UtilsDocumentsService } from '../../services/utils-documents.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    TemplateSystemModule,
    CoreModule,
    BtnSquareDsModule,
  ],
  providers: [HomeModelDocuments, UtilsDocumentsService],
})
export class HomeModule {}
