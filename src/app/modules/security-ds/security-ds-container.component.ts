import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-security-ds-container',
  templateUrl: './security-ds-container.component.html',
  styleUrls: ['./security-ds-container.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SecurityDsContainerComponent implements OnInit, OnDestroy {
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
