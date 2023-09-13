import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { Subject } from 'rxjs';
import { INavigate, Navigate } from '../../../../core/constants/navigate';
import { SecurityModel } from '../../store/model/security.model';

@Component({
  selector: 'app-access-control-container',
  templateUrl: './access-control-container.component.html',
  styleUrls: ['./access-control-container.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccessControlContainerComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean>;
  constructor(private dom: ManipulateDomService, public model: SecurityModel) {
    this._destroy$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    this._setupDom(true);
    this.dom.scrollTop();
  }

  ngOnDestroy(): void {
    this._setupDom(false);
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get mainNavigation(): INavigate {
    return Navigate;
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this.dom.addClass('.main-container-transaction', 'pb-width-full');
      this.dom.addClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.addClass(
        '.main-container-transaction',
        'changes-styles-in-access-control',
      );
      this.dom.addClass('.main-container-transaction-section', 'pb-col-ld-10');
    } else {
      this.dom.removeClass('.main-container-transaction', 'pb-width-full');
      this.dom.removeClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.removeClass(
        '.main-container-transaction',
        'changes-styles-in-access-control',
      );
      this.dom.removeClass(
        '.main-container-transaction-section',
        'pb-col-ld-10',
      );
    }
  }
}
