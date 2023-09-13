import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { Navigate } from '@app/core/constants/navigate';
import { Product } from '@app/core/models/products/product';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterAffiliationData } from '../../entities/register-affiliation';
import { RegisteredAccountsFacade } from '../../registered-accounts.facade';

@Component({
  selector: 'app-register-affiliation',
  templateUrl: './register-affiliation.component.html',
  styleUrls: ['./register-affiliation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterAffiliationComponent implements OnInit, OnDestroy {
  operationData: RegisterAffiliationData;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: RegisteredAccountsFacade,
    private modal: ModalService,
    private translate: TranslateService,
    private router: Router,
    private nickName: NicknamesService,
  ) {}

  ngOnInit(): void {
    this.operationData = {
      step: 1,
      data: {},
      products: [],
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public updateRegisterAffiliationProductData(
    data: RegisterAffiliationData,
  ): void {
    const updatedData = { ...this.operationData.data, ...data.data };
    this.operationData = { ...this.operationData, ...data };
    this.operationData.data = updatedData;
    if (data.step === 2) {
      this.getNickname();
    }
  }

  public loadRegisterProductAffiliationAction(
    data: RegisterAffiliationData,
  ): void {
    this.model.registerProductAffiliation(data.data, data.products);
  }

  redirectToFirstStep(data: RegisterAffiliationData): void {
    data.step = 1;
    this.updateRegisterAffiliationProductData(data);
  }

  get products$(): Observable<Product[]> {
    return this.model.product$;
  }

  get items$(): Observable<string[]> {
    return this.translate.get('REGISTER_PRODUCT_AFFILIATION.LINE_TIME');
  }

  public back(): void {
    if (this.operationData.step <= 1) {
      this.leaveProcess();
    } else {
      this.operationData.step--;
    }
  }

  public leaveProcess(): void {
    this.router.navigate([Navigate.registered_product_affiliations]);
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

      component.title = 'RECHARGE.MODAL.TITLE';
      component.img = '/delete.png';
      component.btnCancel = 'RECHARGE.MODAL.NO';
      component.btnAgree = 'RECHARGE.MODAL.YES';

      component.actionCancel
        .pipe(takeUntil(this.destroy$))
        .subscribe((_) => this.modal.close());
      component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this.modal.close();
        this.leaveProcess();
      });
    }
  }
  public openAlert(): void {
    this.modal.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  public getNickname(): void {
    combineLatest([this.nickName.nicknamesAll()]).subscribe(([nick]: any) => {
      if (nick) {
        const nickname = nick.nicknames.filter(
          (e: any) =>
            e['accountId'] === this.operationData.data.originAccountId,
        );
        nickname['name'] = nickname['name']
          ? nickname['name']
          : this.operationData.data.originAccountName;
        this.operationData.data.originNickName = nickname['name'];
      }
    });
  }
}
