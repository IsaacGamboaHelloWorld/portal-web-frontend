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
import { IPdfdata } from '@app/core/interfaces/certificates/pdfdata';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../core/models/products/product';
import { DialogConfig } from '../../../../shared/modal/services/dialog-config';
import { CertificateModel } from './certificates.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CertificatesContainer implements OnInit, OnDestroy {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();

  public defaultValue: boolean = false;
  public pdfData: IPdfdata;
  public certificatesGenForm: FormGroup;
  public inProcess: boolean = false;
  public isReadyToDownload: boolean = false;
  public currentProduct: Product;
  private maxAmountRetry: number = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogConfig: DialogConfig,
    private model: CertificateModel,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.dialogConfig.data)) {
      this.currentProduct = this.dialogConfig.data as Product;
    }
    this._initForm();
    this.getAmountRetriesMax();
    this.subsFailedDownload();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.model.resetPdfData();
  }

  public doGenerate(): void {
    this.inProcess = true;
    this.isReadyToDownload = false;
    this.model.getPdf(
      this.currentProduct.accountInformation.productType.toString(),
      this.currentProduct.accountInformation.accountIdentifier.toString(),
      this.certificatesGenForm.controls.includeBalance.value,
    );

    this.model.pdf$.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (!isNullOrUndefined(data) && data.base64) {
        this.inProcess = false;
        this.isReadyToDownload = true;
        setTimeout(() => {
          this.downloadPDF();
          this.closeAndNotificate(true);
        }, 10);
      }
    });
  }

  public doChange(): void {
    this.isReadyToDownload = false;
    this.inProcess = false;
    this.model.resetPdfData();
  }

  private _initForm(): void {
    this.certificatesGenForm = new FormGroup({
      includeBalance: new FormControl('', [Validators.required]),
    });
  }

  private subsFailedDownload(): void {
    this.model.pdfFailedRetries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((retries: number) => {
        if (retries > this.maxAmountRetry) {
          this.closeAndNotificate(false);
        }
      });
  }

  private closeAndNotificate(isSuccess: boolean): void {
    this.modalService.close();
    this.model.notificationOpen(
      isSuccess
        ? this.translate.instant('CERTIFICATES.DOWNLOAD_SUCCESS')
        : this.translate.instant('CERTIFICATES.DOWNLOAD_FAILED'),
      true,
      isSuccess ? ClassNotification.SUCCESS : ClassNotification.ERROR,
    );
  }

  private getAmountRetriesMax(): void {
    this.maxAmountRetry = this.translate.instant(
      'CERTIFICATES.RETRY_AMOUNT_MAX',
    );
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
        this.isReadyToDownload = false;
        if (!isNullOrUndefined(data)) {
          this.isReadyToDownload = true;
          return data.name;
        }
      }),
    );
  }
}
