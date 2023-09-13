import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModelDocuments } from '../documents/store/model/home.model';

import { DocumentsDsRoutingModule } from './documents-ds-routing.module';
import { DocumentsDsComponent } from './documents-ds.component';
import { UtilsDocumentsService } from './services/utils-documents.service';

@NgModule({
  declarations: [DocumentsDsComponent],
  imports: [CommonModule, DocumentsDsRoutingModule],
  providers: [HomeModelDocuments, UtilsDocumentsService],
})
export class DocumentsDsModule {}
