import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import {
  DEFAULT_WIDTH,
  MEDIUM_WIDTH,
} from '@app/shared/modal/constants/modal.style';
import { INavigate, Navigate } from '@core/constants/navigate';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { PRODUCT_ACTIVATE } from '../../../../core/constants/comunication-keys';
import { TYPE_ACCOUNTS } from '../../../../core/constants/types_account';
import { Product } from '../../../../core/models/products/product';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { IProductActive } from '../../../../store/reducers/models/product-active/product-active.reducer';
import { SecurityService } from '../../../security/services/security.service';
import { DetailProductModel } from '../../detail-product.model';
import { CertificatesContainer } from '../certificates/certificates.component';
import { StatementsContainer } from '../statements/statements.component';

@Component({
  selector: 'app-smart-options',
  templateUrl: './smart-options.component.html',
  styleUrls: ['./smart-options.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartOptionsComponent implements OnDestroy {
  @Input() data: Product;
  @Input() transferBtn: boolean = false;
  @Input() statementBtn: boolean = false;
  @Input() rechargeBtn: boolean = false;
  @Input() certificateBtn: boolean = false;
  @Input() payLoanBtn: boolean = false;
  @Input() withdrawalBtn: boolean = false;
  @Input() pocketsBtn: boolean = false;
  @Input() payCardBtn: boolean = false;
  @Input() advanceBtn: boolean = false;
  @Input() isPseTC: boolean = false;

  @Output() clickBox: EventEmitter<string> = new EventEmitter();

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private dom: ManipulateDomService,
    private model: DetailProductModel,
    private modal: ModalService,
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get hasData(): boolean {
    return !isNullOrUndefined(this.data);
  }

  get neededToPay(): boolean {
    return Product.getMinimumPayment(this.data) > 0;
  }

  get T_DA(): string {
    return TYPE_ACCOUNTS.DEPOSIT_ACCOUNT;
  }

  get T_CA(): string {
    return TYPE_ACCOUNTS.CURRENT_ACCOUNT;
  }

  get T_CC(): string {
    return TYPE_ACCOUNTS.CREDIT_CARD;
  }

  get typeProduct(): string {
    return this.data.accountInformation.productType;
  }

  get havePockets(): boolean {
    return this.data.couldHavePockets;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public redirect(type: string, id: string | number): void {
    this.securityService.encryptAesGcm(id.toString()).then((data) => {
      this.router.navigate([Navigate.wnocandother, type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  public pockets(): void {
    this.clickBox.emit(Navigate.pockets);
  }

  public recharge(): void {
    this.clickBox.emit(Navigate.recharge_phone);
  }

  public transfer(): void {
    this.clickBox.emit(Navigate.new_transfer);
  }

  public payment(): void {
    this.clickBox.emit(Navigate.paymentsv2obligations);
  }

  public withdrawals(): void {
    const dataToSave: IProductActive = {
      type: this.data.accountInformation.productType,
      id: this.data.accountInformation.accountIdentifier,
    };
    this.model.setProduct(dataToSave);
    this.clickBox.emit(Navigate.wnocandother);
  }

  public doStatements(): void {
    this.modal.open(
      StatementsContainer,
      true,
      `${MEDIUM_WIDTH}`,
      true,
      this.data,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  public doCertificates(): void {
    this.modal.open(
      CertificatesContainer,
      true,
      `${DEFAULT_WIDTH}`,
      true,
      this.data,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modal._dialogComponentRef,
      )
    ) {
      const component = this.modal._dialogComponentRef.instance.componentRef
        .instance;

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modal.close();
      });
    }
  }

  get showAdvance$(): Observable<boolean> {
    return this.model.product$.pipe(
      filter((data) => !!data && data.length > 0),
      map((products) => {
        const accounts = products.filter(
          (product) => product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
        );
        return accounts.length > 0;
      }),
    );
  }

  public hasAmount(amount: number): boolean {
    return amount > 0;
  }

  public async redirectAdvance(): Promise<void> {
    const key = await this.securityService.encryptAesGcm(this.data.id);
    this.securityService.setItem(PRODUCT_ACTIVATE, key);
    const dataToSave: IProductActive = {
      type: this.data.accountInformation.productType,
      id: this.data.accountInformation.accountIdentifier,
    };
    this.model.setProduct(dataToSave);
    this.router.navigate(['avance']);
  }
}
