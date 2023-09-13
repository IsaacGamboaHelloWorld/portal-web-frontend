import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IPdfdata } from '../../../../core/interfaces/statement/pdfdata';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { Product } from '@app/core/models/products/product';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  ITypeCard,
  typeCardEnum,
} from '@app/shared/card-account-radius/constants/type-card.enum';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import {
  DsStatesCardEnum,
  IDsStateCard,
} from '@app/shared/ds/ds-states-card/constants/ds-states-card.enum';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateDocumentsDs,
  NavigateDocumentsDs,
} from '../../constants/navigate-documents-ds';
import { DocumentsService } from '../../services/documents.service';
import { UtilsDocumentsService } from '../../services/utils-documents.service';
import { ExtractsModel } from '../../store/model/extracts.model';
import { HomeModelDocuments } from '../../store/model/home.model';

@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtractsComponent implements OnInit, OnDestroy {
  public formProduct: FormGroup;
  public formDate: FormGroup;
  public activeStep: number = 0;
  public selectOption: any[];
  public susbcribeExtracts: Subscription = new Subscription();
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
    protected _dom: ManipulateDomService,
    private _utils: UtilsDocumentsService,
    private _model: ExtractsModel,
    private _translate: TranslateService,
    private _facade: HomeModelDocuments,
    private _documentService: DocumentsService,
    private _modalService: ModalService,
    private _router: Router,
  ) {
    this._createProductForm();
    this._createDatetForm();
  }

  ngOnInit(): void {
    this._model.creationReset();
    this._utils.setupDomStyles(true);
    this.setOptionsSelect();
    this.getAmountRetriesMax();
  }

  ngOnDestroy(): void {
    this._utils.setupDomStyles(false);
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private getAmountRetriesMax(): void {
    this._maxAmountRetry = this._translate.instant(
      'STATEMENT.RETRY_AMOUNT_MAX',
    );
  }

  public selectData(event: any): void {
    if (!event.data || !event.data.accountInformation) {
      return;
    }
    const { accountInformation } = event.data;
    const { accountIdentifier, productType } = accountInformation;
    this.accountAlias.setValue(accountIdentifier);
    this.typeAlias.setValue(productType);
    this._loadPeriods();
  }

  private _loadPeriods(): void {
    if (!this.accountAlias.value || !this.typeAlias.value) {
      return;
    }
    this._model.creationPeriodsLoad(
      this.accountAlias.value,
      this.typeAlias.value,
    );
  }

  public setOptionsSelect(): void {
    this.periodsData$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => this._mapSelectOption(data));
  }

  private _mapSelectOption(data: any): void {
    this.selectOption = [];
    if (data && data.length) {
      data.forEach((e: IPeriodItem) => {
        const fch = new Date(e.startDate);
        const year = fch.getFullYear();
        const value = {
          label: `${e.periodName.toLowerCase()} - ${year}`,
          value: e,
        };
        this.selectOption.push(value);
      });
      this.dateAlias.setValue(this.selectOption[0]);
    }
  }

  private _createProductForm(): void {
    this.formProduct = new FormGroup({
      index: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  private _createDatetForm(): void {
    this.formDate = new FormGroup({
      date: new FormControl('', Validators.required),
    });
  }

  private _filterProducts(product: Product): boolean {
    return (
      product.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD ||
      product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
      product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT
    );
  }

  private _mapProducts(products: Product[]): Product[] {
    return products.filter((data) => this._filterProducts(data));
  }

  private _subStateEstracts(): void {
    this.susbcribeExtracts = this.stateEstracts$.subscribe((data: IPdfdata) => {
      this._mapStateExtracts(data);
      this.susbcribeExtracts.unsubscribe();
    });
  }

  private _downloadPdf(data: IPdfdata): boolean {
    return this._documentService.downloadPDF(
      data.base64,
      !!data.base64,
      '',
      `${this._translate.instant(
        `PRODUCT_TYPES.${this.typeAlias.value}`,
      )}${String(this.accountAlias.value).slice(-4)}`,
    );
  }

  public trackByFn(_index: number, product: Product): string {
    return product.id;
  }

  public retryLoad(): void {
    this._loadPeriods();
  }

  public donwload(): void {
    if (this._downloadWasSuccess) {
      this._goToHome();
      return;
    }
    this._model.creationLoad(
      this.accountAlias.value,
      this.typeAlias.value,
      this.dateAlias.value,
    );
    this._subStateEstracts();
  }

  get getCardStates(): IDsStateCard {
    return DsStatesCardEnum;
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

  get dateAlias(): AbstractControl {
    return this.formDate.get('date');
  }

  get getTypeCard(): ITypeCard {
    return typeCardEnum;
  }

  get products$(): Observable<Product[]> {
    return this._model.products$.pipe(
      map((products: Product[]) => this._mapProducts(products)),
    );
  }

  get stateEstracts$(): Observable<IPdfdata> {
    return this._model.stateEstracts$;
  }

  private _mapStateExtracts(data: IPdfdata): void {
    this._downloadWasSuccess = false;
    if (data.success) {
      const downloaded = this._downloadPdf(data);
      if (downloaded) {
        this._downloadWasSuccess = true;
        this._facade.notificationOpen(
          this._translate.instant('DOCUMENTS.EXTRACTS.DETAIL.SUCCESS'),
          true,
          ClassNotification.SUCCESS,
        );
      }
    } else if (!data.success && !!data.accountInformation) {
      this.retryCount++;
      if (this.retryCount > this._maxAmountRetry) {
        this._openModal();
      }
    }
  }

  get statePeriodsEstracts$(): Observable<IStatementDs> {
    return this._model.statePeriodsEstracts$;
  }

  get periodsData$(): Observable<IPeriodItem[]> {
    return this.statePeriodsEstracts$.pipe(
      map((data) => this._mapPeriods(data)),
    );
  }

  private _mapPeriods(data: IStatementDs): IPeriodItem[] {
    if (
      !isNullOrUndefined(data) &&
      !isNullOrUndefined(data.periods) &&
      !isNullOrUndefined(data.periods.length) &&
      data.periods.length
    ) {
      return data.periods;
    }
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
      component.title = 'DOCUMENTS.EXTRACTS.MODAL_ERROR.TITLE';
      component.description = 'DOCUMENTS.EXTRACTS.MODAL_ERROR.TITLE';
      component.btnAgree = 'DOCUMENTS.EXTRACTS.MODAL_ERROR.BTN';

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
  // tslint:disable-next-line:max-file-line-count
}
