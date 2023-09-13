import { Component, ViewEncapsulation } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  INavigateDocuments,
  NavigateDocuments,
} from '../documents/entities/routes';

@Component({
  selector: 'app-documents-ds',
  templateUrl: './documents-ds.component.html',
  styleUrls: ['./documents-ds.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsDsComponent {
  constructor(protected _dom: ManipulateDomService) {}

  get navigate(): INavigateDocuments {
    return NavigateDocuments;
  }
}
