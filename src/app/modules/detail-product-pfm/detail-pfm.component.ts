import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { getDatesPfm } from '@app/shared/helpers/datePFM.helper';
import { INavigate, Navigate } from './../../core/constants/navigate';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';
import { DatePfm } from './../../shared/helpers/datePFM.helper';

@Component({
  selector: 'app-detail-container-pfm',
  templateUrl: './detail-pfm.component.html',
  styleUrls: ['./detail-pfm.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailPfmContainer implements OnInit, OnDestroy {
  dateList: DatePfm[];

  constructor(private dom: ManipulateDomService) {
    this.dateList = getDatesPfm();
  }

  ngOnInit(): void {
    this._setupDom(true);
  }

  ngOnDestroy(): void {
    this._setupDom(false);
  }

  get navigate(): INavigate {
    return Navigate;
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this.dom.addClass('.main-container-transaction', 'pb-width-full');
      this.dom.addClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.addClass(
        '.main-container-transaction',
        'changes-styles-in-detail-pfm',
      );
      this.dom.addClass('.main-container-transaction-section', 'pb-col-d-10');
    } else {
      this.dom.removeClass('.main-container-transaction', 'pb-width-full');
      this.dom.removeClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.removeClass(
        '.main-container-transaction',
        'changes-styles-in-detail-pfm',
      );
      this.dom.removeClass(
        '.main-container-transaction-section',
        'pb-col-d-10',
      );
    }
  }
}
