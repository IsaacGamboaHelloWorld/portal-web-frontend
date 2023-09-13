import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClassNotification } from '@app/core/constants/notification';
import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';
import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../core/models/products/product';
import { DialogConfig } from '../../../../shared/modal/services/dialog-config';
import { StatementModel } from './statements.model';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StatementsContainer implements OnInit, OnDestroy {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();

  public statement: IStatementDs;
  public pdfData: IPdfdata;
  public statementGenForm: FormGroup;
  public inProcess: boolean = false;
  public isReadyToDownload: boolean = false;
  public parameters: any;
  public currentProduct: FreeDestinationDetail | Product;
  public acountType: string;
  private maxAmountRetry: number = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogConfig: DialogConfig,
    private model: StatementModel,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.dialogConfig.data)) {
      this.currentProduct = this.dialogConfig.data as Product;
    }
    this._initForm();
    this.getPeriods();
    this.getAmountRetriesMax();
    this.subscriptionFailedDownload();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.model.resetPdfData();
    this.model.resetPeriods();
    this.modalService.hideBtnCancel(false);
  }

  public doGenerate(): void {
    this.inProcess = true;
    this.isReadyToDownload = false;
    this.model.getPdf(
      this.currentProduct.accountInformation.accountIdentifier.toString(),
      this.currentProduct.accountInformation.productType.toString(),
      this.statementGenForm.controls.period.value,
    );

    this.model.pdf$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IPdfdata) => {
        if (!isNullOrUndefined(data) && data.base64) {
          this.inProcess = false;
          this.isReadyToDownload = true;
          setTimeout(() => {
            this.downloadPDF();
            this.closeModalAndNotification(true);
          }, 10);
        }
      });
  }

  public doChange(): void {
    this.isReadyToDownload = false;
    this.inProcess = false;
    this.model.resetPdfData();
  }

  public doRetry(): void {
    this.getPeriods();
  }

  get hasPeriodsAvailables$(): boolean {
    return !isNullOrUndefined(this.model.periods$);
  }

  private _initForm(): void {
    this.statementGenForm = new FormGroup({
      period: new FormControl('', [Validators.required]),
    });
  }

  private getPeriods(): void {
    if (!isNullOrUndefined(this.currentProduct)) {
      this.model.getPeriods(
        this.currentProduct.accountInformation.accountIdentifier.toString(),
        this.currentProduct.accountInformation.productType.toString(),
      );
    }
  }

  private subscriptionFailedDownload(): void {
    this.model.pdfFailedRetries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((retries: number) => {
        if (retries > this.maxAmountRetry) {
          this.closeModalAndNotification(false);
        }
      });
  }

  private closeModalAndNotification(isSuccess: boolean): void {
    this.modalService.close();
    this.model.notificationOpen(
      isSuccess
        ? this.translate.instant('STATEMENT.DOWNLOAD_SUCCESS')
        : this.translate.instant('STATEMENT.DOWNLOAD_FAILED'),
      true,
      isSuccess ? ClassNotification.SUCCESS : ClassNotification.ERROR,
    );
  }

  private getAmountRetriesMax(): void {
    this.maxAmountRetry = this.translate.instant('STATEMENT.RETRY_AMOUNT_MAX');
  }

  private downloadPDF(): void {
    const downloadButton = document.getElementById('btnDownload');
    downloadButton.click();
  }

  get pdfError$(): Observable<boolean> {
    return this.model.pdfError$;
  }

  get pdfLoading$(): Observable<boolean> {
    return this.model.pdfLoading$;
  }

  get pdfLoaded$(): Observable<boolean> {
    return this.model.pdfLoaded$;
  }

  get periodsData$(): Observable<IPeriodItem[]> {
    return this.model.periods$.pipe(
      map((data) => {
        if (!isNullOrUndefined(data)) {
          return data.periods;
        }
      }),
    );
  }

  get pdfData$(): Observable<boolean> {
    return this.model.pdf$.pipe(
      map((data) => {
        return !isNullOrUndefined(data);
      }),
    );
  }

  get fileBase64$(): Observable<SafeUrl> {
    return this.model.pdf$.pipe(
      map((data: IPdfdata) => {
        this.isReadyToDownload = false;
        if (!isNullOrUndefined(data)) {
          this.isReadyToDownload = true;
          return this.sanitizer.bypassSecurityTrustUrl(data.base64);
        }
      }),
    );
  }

  get filename$(): Observable<string> {
    return this.model.pdf$.pipe(
      map((data: IPdfdata) => {
        this.inProcess = true;
        this.isReadyToDownload = false;
        if (!isNullOrUndefined(data)) {
          this.isReadyToDownload = true;
          this.inProcess = false;
          return data.name;
        }
      }),
    );
  }

  get periodsError$(): Observable<boolean> {
    return this.model.periodsError$.pipe(
      map((state: boolean) => {
        this.modalService.hideBtnCancel(state);
        return state;
      }),
    );
  }

  get periodsLoading$(): Observable<boolean> {
    return this.model.periodsLoading$;
  }

  get periodsLoaded$(): Observable<boolean> {
    return this.model.periodsLoaded$;
  }

  public compareFnPeriods(c1: any, c2: any): boolean {
    return c1 === c2;
  }
}
