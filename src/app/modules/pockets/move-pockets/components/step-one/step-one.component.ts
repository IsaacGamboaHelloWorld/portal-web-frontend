import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/products/product';
import {
  INavigatePockets,
  NavigatePockets,
} from '@app/modules/pockets/home-pockets/entities/routes';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../../../environments/environment';
import { Navigate } from '../../../../../core/constants/navigate';
import { ManipulateDomService } from '../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { setValidators } from '../../../../../shared/helpers/formValidators.helper';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';
import { IPocketActive } from '../../../home-pockets/store/reducers/active-pocket.reducer';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';
import { IMoveMoney } from '../../store/reducers/move-money.reducer';
import { ModalMovePocketsComponent } from '../modal-move-pockets/modal-move-pockets.component';

@Component({
  selector: 'app-move-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  providers: [HomePocketsFacade],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneMoveComponent implements OnInit, OnDestroy {
  public formStepOne: FormGroup;
  public isPocket: boolean = false;
  public POCKET: string = 'POCKET';
  public ACCOUNT: string = 'ACCOUNT';
  public THIS: string = 'THIS';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public activeProd: IProductActive;
  public activePocket: IPocketActive;
  public options: object[] = [];
  public typeActive: string;
  public producActvePockect: Product = {};
  public error: string = '';
  public total: number = 0;
  @ViewChild('inputHowmuch', null) inputHowmuch: ElementRef;
  constructor(
    private _dom: ManipulateDomService,
    private _facade: MovePocketPocketsFacade,
    private facade: HomePocketsFacade,
    private router: Router,
    private modalService: ModalService,
    private translate: TranslateService,
    private render: Renderer2,
  ) {}

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }

  ngOnInit(): void {
    this._initForm();
    this.formStepOne
      .get('option_move')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this._changeStatus(data);
        if (data === this.POCKET) {
          this.isPocket = true;
          setValidators(this.formStepOne, ['pocket_to'], [Validators.required]);
        } else {
          this.isPocket = false;
          setValidators(this.formStepOne, ['pocket_to'], null);
        }
      });

    this._facade.activeProduct$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IProductActive) => {
        if (!isNullOrUndefined(data)) {
          this.activeProd = data;
        }
      });

    this._facade.activePocket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IPocketActive) => {
        if (!isNullOrUndefined(data)) {
          this.activePocket = data;
          this._removeElement(this.activePocket);
          if (!!!this.formStepOne.get('pocket_to')['value']) {
            this.formStepOne
              .get('pocket_to')
              .setValue(this.options[0]['value']);
          }
        } else {
          this.router.navigate([Navigate.home]);
        }
      });
    this._facade.movedMoney$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IMoveMoney) => {
        if (!isNullOrUndefined(data) && !!data.data) {
          if (data.data.success) {
            this.router.navigate([this.navigate.success_move_money], {
              queryParams: {
                amount: this.formStepOne.value.how_much,
                pocketToName: this.formStepOne.value.pocket_to.pocketName,
                typeActive: this.typeActive,
              },
              queryParamsHandling: 'merge',
            });
          } else {
            this._clearData();
          }
        }
      });
  }

  private _clearData(): void {
    this._facade.clearMovements();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private _removeElement(pocketActive: IPocketActive): void {
    if (!!pocketActive && !!pocketActive.pocketList) {
      for (const pocket of pocketActive.pocketList) {
        if (pocket.pocketId !== pocketActive.pocketId) {
          this.options.push({
            label: pocket.pocketName,
            value: pocket,
          });
        }
      }
    }
  }

  private _changeStatus(_item: string): void {
    switch (_item) {
      case this.ACCOUNT:
        this._dom.addClass('.container-account', 'active');
        this._dom.removeClass('.container-pocket', 'active');
        this._dom.removeClass('.container-this', 'active');
        break;
      case this.POCKET:
        this._dom.addClass('.container-pocket', 'active');
        this._dom.removeClass('.container-account', 'active');
        this._dom.removeClass('.container-this', 'active');
        break;
      case this.THIS:
        this._dom.addClass('.container-this', 'active');
        this._dom.removeClass('.container-account', 'active');
        this._dom.removeClass('.container-pocket', 'active');
        break;
      default:
        break;
    }
  }

  private _initForm(): void {
    this.formStepOne = new FormGroup({
      how_much: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[0-9]*'),
      ]),
      option_move: new FormControl('', Validators.required),
      pocket_to: new FormControl(''),
      account_origin: new FormControl(''),
    });
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  public submitForm(): void {
    let data: any = {};
    this.facade.products$.subscribe((info) => {
      if (info.length) {
        this.producActvePockect = info.filter(
          (e: Product) => e && e.id === this.activeProd.id,
        )[0];
      }
    });
    switch (this.formStepOne.value.option_move) {
      case this.ACCOUNT:
        data = {
          amount: this.formStepOne.value.how_much,
          parentAccountId: this.activeProd.id,
          parentAccountType: this.activeProd.type.toUpperCase(),
          pocketIdFrom: this.activePocket.pocketId,
          pocketTypeFrom: this.activePocket.pocketType,
          pocketIdTo: this.activeProd.id,
          pocketTypeTo: this.activeProd.type.toUpperCase(),
        };
        break;
      case this.POCKET:
        data = {
          amount: this.formStepOne.value.how_much,
          parentAccountId: this.activeProd.id,
          parentAccountType: this.activeProd.type.toUpperCase(),
          pocketIdFrom: this.activePocket.pocketId,
          pocketTypeFrom: this.activePocket.pocketType,
          pocketIdTo: this.formStepOne.value.pocket_to.pocketId,
          pocketTypeTo: this.formStepOne.value.pocket_to.pocketType,
        };
        break;
      case this.THIS:
        data = {
          amount: this.formStepOne.value.how_much,
          parentAccountId: this.activeProd.id,
          parentAccountType: this.activeProd.type.toUpperCase(),
          pocketIdFrom: this.activeProd.id,
          pocketTypeFrom: this.activeProd.type.toUpperCase(),
          pocketIdTo: this.activePocket.pocketId,
          pocketTypeTo: this.activePocket.pocketType,
        };
        break;
      default:
        break;
    }
    this._facade.moveToAccount(data);
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public setBorder(value: string): void {
    this.typeActive = value;
    this.formStepOne.controls.option_move.setValue(this.typeActive);
    this.setError();
  }

  get productDefault$(): Observable<Product> {
    return this.facade.products$.pipe(
      map((product: Product[]) =>
        product.filter((data) => data.id === this.activeProd.id).shift(),
      ),
    );
  }

  get moveMoneyPocket$(): Observable<any> {
    return this._facade.movedMoney$;
  }

  private _actionsModal(
    title: string,
    desc: string,
    value: number,
    account: string,
  ): void {
    this.modalService.open(
      ModalMovePocketsComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      if (
        checkNested(
          ['instance', 'componentRef', 'instance'],
          this.modalService._dialogComponentRef,
        )
      ) {
        const component = this.modalService._dialogComponentRef.instance
          .componentRef.instance;
        component.title = title;
        component.desc = desc;
        component.value = value;
        component.account = account;
        component.img = '/like-icon-pocket.svg';
        component.btnAgree = 'POCKETS.MODAL.CLOSE';
        component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate([Navigate.pockets]);
          this.modalService.close();
        });
      }
    }, 10);
  }

  public validateGoal(event: string): void {
    if (event) {
      this.total = parseInt(event, null);
      this.setError();
    }
  }
  public setError(): void {
    this.formStepOne.controls.how_much.setErrors(null);
    this.error = '';
    this.render.removeClass(
      this.inputHowmuch.nativeElement,
      'set-state-error-bg',
    );
    switch (this.typeActive) {
      case this.ACCOUNT:
        if (this.total > parseInt(this.activePocket.savingGoal, null)) {
          this.render.addClass(
            this.inputHowmuch.nativeElement,
            'set-state-error-bg',
          );
          this.error = this.translate.instant('POCKETS.MOVE.STEP_ONE.ERROR2');
          setTimeout(() => {
            this.formStepOne.controls.how_much.setErrors({ invalid: true });
          }, 400);
        }
        break;
      case this.THIS:
        let tot = 0;
        tot = this.total + parseInt(this.activePocket.amountSaved, null);
        if (tot > parseInt(this.activePocket.savingGoal, null)) {
          this.render.addClass(
            this.inputHowmuch.nativeElement,
            'set-state-error-bg',
          );
          this.error = this.translate.instant('POCKETS.MOVE.STEP_ONE.ERROR2');
          setTimeout(() => {
            this.formStepOne.controls.how_much.setErrors({ invalid: true });
          }, 400);
        }
        break;
      case this.POCKET:
        let other = 0;
        other =
          this.total +
          parseInt(this.formStepOne.value['pocket_to']['amountSaved'], null);
        this.formStepOne.value['pocket_to']['amountSaved'];
        this.formStepOne.value['pocket_to']['savingGoal'];
        if (
          other >
          parseInt(this.formStepOne.value['pocket_to']['savingGoal'], null)
        ) {
          this.render.addClass(
            this.inputHowmuch.nativeElement,
            'set-state-error-bg',
          );
          this.error = this.translate.instant('POCKETS.MOVE.STEP_ONE.ERROR2');
          setTimeout(() => {
            this.formStepOne.controls.how_much.setErrors({ invalid: true });
          }, 400);
        }
        break;
    }
  }
  // tslint:disable-next-line: max-file-line-count
}
