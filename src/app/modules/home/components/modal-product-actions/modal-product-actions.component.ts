import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassNotification } from './../../../../core/constants/notification';

import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { HomeModel } from '@modules/home/home.model';
import { IStocksAllState } from '@modules/home/store/reducers/stocks/stocks-all.reducer';

@Component({
  selector: 'app-modal-product-actions',
  templateUrl: './modal-product-actions.component.html',
  styleUrls: ['./modal-product-actions.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProductActionsComponent implements OnInit, OnDestroy {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() loadings: number = 5;

  private maxAmountRetry: number = 0;

  constructor(
    private facade: HomeModel,
    public dialogConfig: DialogConfig,
    private modalService: ModalService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.maxAmountRetry = this.translate.instant(
      'ACTIONS_AVAL.RETRY_AMOUNT_MAX',
    );
  }

  ngOnDestroy(): void {
    this.facade.resetStockAll();
    this.modalService.hideBtnCancel(false);
  }

  get actions$(): Observable<IStocksAllState> {
    return this.facade.stocksAll$.pipe(
      map((result) => {
        this.checkShowCloseButton(result);
        this.checkRetries(result.retries);
        return result;
      }),
    );
  }

  private checkShowCloseButton(result: IStocksAllState): void {
    if (
      result.error ||
      (result.data &&
        result.data.stocksAval &&
        result.data.stocksAval.length === 0)
    ) {
      this.modalService.hideBtnCancel(true);
    } else {
      this.modalService.hideBtnCancel(false);
    }
  }

  private checkRetries(retryAmount: number): void {
    if (retryAmount > this.maxAmountRetry) {
      this.modalService.close();
      this.facade.notificationOpen(
        this.translate.instant('ACTIONS_AVAL.SERVICE_FAILED'),
        true,
        ClassNotification.ERROR,
      );
    }
  }

  public retry(): void {
    this.facade.fetchStocksAll(this.dialogConfig.data);
  }
}
