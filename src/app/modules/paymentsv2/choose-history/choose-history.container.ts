import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { INavigate, Navigate } from '../../../core/constants/navigate';
import { ClassNotification } from '../../../core/constants/notification';
import { ManipulateDomService } from './../../../core/services/manipulate-dom/manipulate-dom.service';
import { ChooseHistoryFacade } from './choose-history.facade';
import { IHistoricPayments } from './store/reducers/choose-history.reducer';

@Component({
  selector: 'app-choose-history',
  templateUrl: './choose-history.container.html',
  styleUrls: ['./choose-history.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ChooseHistoryContainer implements OnInit, OnDestroy {
  constructor(
    private _facade: ChooseHistoryFacade,
    private _translate: TranslateService,
    private _dom: ManipulateDomService,
    private model: ApplicationModel,
  ) {}

  ngOnInit(): void {
    this._facade.fetchHistoric();
  }

  ngOnDestroy(): void {
    this._setupClass(false);
  }

  private _setupClass(add: boolean): void {
    if (add) {
      this._dom.addClass(
        '.main-container-transaction',
        'container-home-payment',
      );
    } else {
      this._dom.removeClass(
        '.main-container-transaction',
        'container-home-payment',
      );
    }
  }

  public clickRedirect(): void {
    this._facade.notificationOpen(
      this._translate.instant('PAYMENTSV2.SHARED_COPY.LBL_ALERT'),
      true,
      ClassNotification.INFO,
    );
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  get historicPayments$(): Observable<IHistoricPayments> {
    return this._facade.historicPayments$.pipe(
      map((info) => {
        const _hasData =
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.data) &&
          info.data.length > 0;
        this._setupClass(_hasData);
        return info;
      }),
    );
  }

  get hasData$(): Observable<boolean> {
    return this.historicPayments$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.data) &&
          info.data.length > 0,
      ),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }
}
