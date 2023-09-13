import { Injectable } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';

@Injectable()
export class UtilsDocumentsService {
  constructor(protected _dom: ManipulateDomService) {}

  public setupDomStyles(isAdd: boolean, classes: any[] = []): void {
    const classOne = !!classes[0] ? classes[0] : 'pb-width-full';
    const classTwo = !!classes[1] ? classes[1] : 'pb-col-sp-4';
    const classThree = !!classes[2]
      ? classes[2]
      : 'changes-styles-in-documents-ds';
    const classFour = !!classes[3] ? classes[3] : 'pb-col-ld-12';

    if (isAdd) {
      this._dom.addClass('.main-container-transaction', classOne);
      this._dom.addClass('.main-container-transaction', classTwo);
      this._dom.addClass('.main-container-transaction', classThree);
      this._dom.addClass('.main-container-transaction-section', classFour);
    } else {
      this._dom.removeClass('.main-container-transaction', classOne);
      this._dom.removeClass('.main-container-transaction', classTwo);
      this._dom.removeClass('.main-container-transaction', classThree);
      this._dom.removeClass('.main-container-transaction-section', classFour);
    }
  }
}
