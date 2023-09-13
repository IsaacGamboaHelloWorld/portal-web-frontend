import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { Product } from '@app/core/models/products/product';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { SecurityService } from '../security/services/security.service';
import {
  INavigateRechargePhone,
  NavigateRechargePhone,
} from './entities/routes';

@Component({
  selector: 'app-recharge-phone',
  templateUrl: './recharge-phone.container.html',
  styleUrls: ['./recharge-phone.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RechargePhoneContainer implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public numberSteps: number = 3;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 3;
  public backUrl: string;
  public param1: string;
  public param2: string;
  constructor(
    private translate: TranslateService,
    private model: RechargeModel,
    private modalService: ModalService,
    private router: Router,
    private security: SecurityService,
    private dom: ManipulateDomService,
  ) {}
  ngOnInit(): void {
    this.model.loadOperators();
    this._closeModal();
    this.dom.scrollTop();
    this.router.navigate([this.navigate.step1]);
    this.validateSteps();
  }
  get step$(): Observable<number> {
    return this.model.step$;
  }
  get navigate(): INavigateRechargePhone {
    return NavigateRechargePhone;
  }
  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.home;
    } else {
      this.validateSteps();
    }
  }
  public validateSteps(): void {
    this.step$.pipe(takeUntil(this._destroy$)).subscribe((response) => {
      this.param1 = '';
      this.param2 = '';
      this.viewBack = false;
      if (response > 1) {
        this.viewBack = true;
      }
      switch (response) {
        case 1:
          this._setDefaultValue();
          break;
        case 2:
          this.backUrl = this.navigate.step1;
          break;
        default:
          this.backUrl = this.navigate.step1;
          break;
      }
      if (response === this.maxStep) {
        this.viewBack = false;
        this.backUrl = this.navigate.step1;
      }
    });
  }
  get productsOrigin$(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return (
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.CURRENT_ACCOUNT ||
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
          );
        });
      }),
    );
  }
  private _setDefaultValue(): void {
    combineLatest([this.model.productActive$, this.productsOrigin$])
      .pipe(
        take(1),
        map((data) => {
          return { productDetail: data[0], products: data[1], loans: null };
        }),
      )
      .subscribe((info) => {
        this.viewBack = info['productDetail'] ? true : false;
        if (info['productDetail']) {
          this.security
            .encryptAesGcm(info['productDetail']['id'].toString())
            .then((data) => {
              this.backUrl = this.navigate.detail;
              this.param1 = info['productDetail']['type'].toLowerCase();
              this.param2 = data;
              this.dom.scrollTop();
            });
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.model.resetRecharge();
    this.model.resetProduct();
    this.model.resetFormOne();
    this.model.setStep(1);
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _closeModal(): void {
    this.router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this.modalService.close();
      });
  }
}
