import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {
    this._setupDom(true);
  }

  ngOnDestroy(): void {
    this._setupDom(false);
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this.dom.addClass('.main-container-transaction', 'pb-width-full');
      this.dom.addClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.addClass(
        '.main-container-transaction',
        'changes-styles-in-security',
      );
      this.dom.addClass('.main-container-transaction-section', 'pb-col-ld-10');
    } else {
      this.dom.removeClass('.main-container-transaction', 'pb-width-full');
      this.dom.removeClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.removeClass(
        '.main-container-transaction',
        'changes-styles-in-security',
      );
      this.dom.removeClass(
        '.main-container-transaction-section',
        'pb-col-ld-10',
      );
    }
  }

  get mainNavigation(): INavigate {
    return Navigate;
  }
}
