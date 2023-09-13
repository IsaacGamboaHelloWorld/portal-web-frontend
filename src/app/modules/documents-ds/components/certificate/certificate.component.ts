import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { Product } from '@app/core/models/products/product';
import {
  ITypeCard,
  typeCardEnum,
} from '@app/shared/card-account-radius/constants/type-card.enum';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  INavigateDocumentsDs,
  NavigateDocumentsDs,
} from '../../constants/navigate-documents-ds';
import { ICertificateAccountRequest } from '../../entities/documents-general';
import { DocumentsService } from '../../services/documents.service';
import { UtilsDocumentsService } from '../../services/utils-documents.service';
import { HomeModelDocuments } from '../../store/model/home.model';
import { ICertificateState } from '../../store/state/documents.state';
import { TYPE_ACCOUNTS } from './../../../../core/constants/types_account';
import { CertificateModel } from './../../store/model/certificate.model';
import {
  ITypeCertificate,
  TypeCertificateEnum,
} from './constants/type-certificate.enum';
import { ICertificateOption } from './entities/certificate-option.interface';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateComponent implements OnInit, OnDestroy {
  public formProduct: FormGroup;
  public formCertificate: FormGroup;
  public activeStep: number = 0;
  public selectOption: ICertificateOption[] = [];
  public susbcribeCertificate: Subscription = new Subscription();
  public retryCount: number = 0;

  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _maxAmountRetry: number = 0;
  private _downloadWasSuccess: boolean = false;
  private _maxCarousel: number = 4;

  @HostListener('scroll', ['$event']) scrollHandler(e: any): void {
    const item = e.target;
    let widthChild = 375;
    if (!!item && !!item.children && item.children.length > 0) {
      widthChild = item.children[0].offsetWidth + 16;
    }
    const scrollLeft = item.scrollLeft;
    const marginLeft = (scrollLeft / widthChild) * 16;
    const total = scrollLeft + widthChild + marginLeft;
    const div = total / widthChild;
    const step = Math.floor(div);
    this.activeStep = step - 1;
    if (this.activeStep > this._maxCarousel) {
      this.activeStep = this._maxCarousel;
    }
  }

  constructor(
    private _utils: UtilsDocumentsService,
    private _model: CertificateModel,
    private _translate: TranslateService,
    private _documentService: DocumentsService,
    private _facade: HomeModelDocuments,
    private _modalService: ModalService,
    private _router: Router,
  ) {
    this._createOptionSelect();
    this._createProductForm();
    this._createCertificateForm();
  }

  ngOnInit(): void {
    this._model.reset();
    this._utils.setupDomStyles(true);
    this.getAmountRetriesMax();
  }

  ngOnDestroy(): void {
    this._utils.setupDomStyles(false);
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _createOptionSelect(): void {
    this.selectOption = [
      {
        label: 'DOCUMENTS.CERTIFICATE.DETAIL.TYPE_PLACEHOLDER',
        value: null,
      },
      {
        label: this.getTypeCertificate.WITHOUT,
        value: false,
      },
      {
        label: this.getTypeCertificate.WITH,
        value: true,
      },
    ];
  }

  private getAmountRetriesMax(): void {
    this._maxAmountRetry = this._translate.instant(
      'STATEMENT.RETRY_AMOUNT_MAX',
    );
  }

  private _createProductForm(): void {
    this.formProduct = new FormGroup({
      index: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  private _createCertificateForm(): void {
    this.formCertificate = new FormGroup({
      recipient: new FormControl(''),
      includeBalance: new FormControl('', Validators.required),
    });
  }

  public selectData(event: any): void {
    if (!event.data || !event.data.accountInformation) {
      return;
    }
    const { accountInformation } = event.data;
    const { accountIdentifier, productType } = accountInformation;
    this.accountAlias.setValue(accountIdentifier);
    this.typeAlias.setValue(productType);
  }

  public donwload(): void {
    if (this._downloadWasSuccess) {
      this._goToHome();
      return;
    }
    const data: ICertificateAccountRequest = {
      accountId: this.accountAlias.value,
      accountType: this.typeAlias.value,
      includeBalance: this.includeBalanceAlias.value,
      recipient: this.recipientAlias.value,
    };
    this._model.creationLoad(data);
    this._subStateCertificate();
  }

  private _subStateCertificate(): void {
    this.susbcribeCertificate = this.stateCertificate$.subscribe(
      (data: ICertificateState) => {
        this._mapStateCertificate(data);
        this.susbcribeCertificate.unsubscribe();
      },
    );
  }

  private _mapStateCertificate(data: ICertificateState): void {
    this._downloadWasSuccess = false;
    if (data.success) {
      const downloaded = this._downloadPdf(data);
      if (downloaded) {
        this._downloadWasSuccess = true;
        this._facade.notificationOpen(
          this._translate.instant('DOCUMENTS.CERTIFICATE.DETAIL.SUCCESS'),
          true,
          ClassNotification.SUCCESS,
        );
      }
    } else {
      this.retryCount++;
      if (this.retryCount > this._maxAmountRetry) {
        this._openModal();
      }
    }
  }

  private _downloadPdf(data: ICertificateState): boolean {
    return this._documentService.downloadPDF(
      data.base64,
      data.success,
      data.errorMessage,
      `${this._translate.instant(
        `PRODUCT_TYPES.${this.typeAlias.value}`,
      )}${String(this.accountAlias.value).slice(-4)}`,
    );
  }

  public trackByFn(_index: number, product: Product): string {
    return product.id;
  }

  private _filterProducts(product: Product): boolean {
    return (
      product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
      product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT
    );
  }

  private _mapProducts(products: Product[]): Product[] {
    return products.filter((data) => this._filterProducts(data));
  }

  get products$(): Observable<Product[]> {
    return this._model.products$.pipe(
      map((products: Product[]) => this._mapProducts(products)),
    );
  }

  get stateCertificate$(): Observable<ICertificateState> {
    return this._model.stateCertificate$;
  }

  get navigateDocuments(): INavigateDocumentsDs {
    return NavigateDocumentsDs;
  }

  get indexAlias(): AbstractControl {
    return this.formProduct.get('index');
  }

  get accountAlias(): AbstractControl {
    return this.formProduct.get('account');
  }

  get typeAlias(): AbstractControl {
    return this.formProduct.get('type');
  }

  get recipientAlias(): AbstractControl {
    return this.formCertificate.get('recipient');
  }

  get includeBalanceAlias(): AbstractControl {
    return this.formCertificate.get('includeBalance');
  }

  get getTypeCard(): ITypeCard {
    return typeCardEnum;
  }

  get getTypeCertificate(): ITypeCertificate {
    return TypeCertificateEnum;
  }

  private _openModal(): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.title = 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.TITLE';
      component.description = 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.DESCRIPTION';
      component.btnAgree = 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.BTN';

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._model.reset();
        this._goToHome();
        this._modalService.close();
      });
    }
  }

  private _goToHome(): void {
    this._router.navigate([this.navigateDocuments.home]);
  }
}
