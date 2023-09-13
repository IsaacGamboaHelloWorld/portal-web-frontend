import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/products/product';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import {
  validateData,
  validateType,
} from '@app/shared/helpers/validateData.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { AlertCloseComponent } from '@core/components/alert-close/alert-close.component';
import { NEW } from '@core/constants/global';
import { IFormOneTransferInterface } from '@core/interfaces/formOneTransfer.interface';
import { IFavorite } from '@modules/transfer-to-account/entities/favorites';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { FormStepThreeState } from '@store/reducers/models/transfer/steps/form-step-three.reducer';
import { FormStepTwoState } from '@store/reducers/models/transfer/steps/form-step-two.reducer';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../old-transfer/constants/routes';

@Component({
  selector: 'app-favorite-transfers',
  templateUrl: './favorite-transfers.component.html',
  styleUrls: ['./favorite-transfers.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class FavoriteTransfersComponent implements OnDestroy {
  @Input() favorites: IFavorite[];
  @Output() transfer: EventEmitter<IFavorite> = new EventEmitter<IFavorite>();
  public showDelete: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _modelTransfer: TransferModel,
    private modalService: ModalService,
    private _router: Router,
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this._modelTransfer.setStep({ step });
  }

  get navigate(): INavigateOldTransfer {
    return NavigateOldTransfer;
  }

  public toggleDelete(): void {
    this.showDelete = !this.showDelete;
  }

  public fetchDeleteFavorite(data: IFavorite): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal(data);
    }, 10);
  }

  public setTransferFavorite(favorite: IFavorite): void {
    let accountOrigin: Product;
    this.extractOriginAccount(
      validateData(favorite.accountFromInformation.accountIdentifier, ''),
      validateData(favorite.accountFromInformation.productType, ''),
    )
      .subscribe((data) => {
        if (!!data && data.length !== 0) {
          accountOrigin = data[0];
        }
      })
      .unsubscribe();
    const transferForm: IFormOneTransferInterface = {
      account_origin: accountOrigin,
      account_destination: {
        destinationAccountId: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.accountIdentifier,
          NEW,
        ),
        destinationAccountType: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.productType,
          NEW,
        ),
        customerId: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.identificationNumber,
          '',
        ),
        customerIdType: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.identificationType,
          '',
        ),
        customerName: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.name,
          '',
        ),
        email: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.email,
          '',
        ),
        bankId: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.bank,
          '',
        ),
        bankName: validateType(
          !favorite.accountToInformation.isNewAccount,
          favorite.accountToInformation.bankName,
          '',
        ),
      },
      productType: validateData(favorite.accountToInformation.productType, ''),
      bank: {
        value: validateData(favorite.accountToInformation.bank, ''),
        name: validateData(favorite.accountToInformation.bankName, ''),
      },
      accountIdentifier: validateData(
        favorite.accountToInformation.accountIdentifier,
        '',
      ),
      name: validateData(favorite.accountToInformation.name, ''),
      identificationType: validateData(
        favorite.accountToInformation.identificationType,
        '',
      ),
      identificationNumber: validateData(
        favorite.accountToInformation.identificationNumber,
        '',
      ),
    };

    const formTwo: FormStepTwoState = {
      amount: validateData(favorite.transferInformation.amount, ''),
      description: '',
      voucher: '',
      transactionCost: '',
    };

    const formThree: FormStepThreeState = {
      dueDate: null,
      scheduledTransfer: '',
      favorite: validateData(favorite.accountToInformation.isFavorite, false),
    };

    this._modelTransfer.setFormOne(transferForm);
    this._modelTransfer.setFormTwo(formTwo);
    this._modelTransfer.setFormThree(formThree);
    if (!favorite.accountToInformation.isNewAccount) {
      this._modelTransfer.fetchDestinationProducts(
        validateData(favorite.accountFromInformation.accountIdentifier, ''),
        validateData(favorite.accountFromInformation.productType, ''),
      );
    }
    this._setStep(2);
    this._router.navigate([this.navigate.step2]);
  }

  private extractOriginAccount(
    productId: string,
    productType: string,
  ): Observable<Product[]> {
    return this._modelTransfer.product$.pipe(
      filter(
        (products: Product[]) =>
          !isNullOrUndefined(products) && products.length > 0,
      ),
      map((products) => {
        return products.filter(
          (product) =>
            product.typeAccount === productType && product.id === productId,
        );
      }),
    );
  }

  private _actionsModal(data: IFavorite): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.title = 'FAVORITE.ALERT.TITLE';
      component.img = '/delete.png';
      component.btnCancel = 'CANCEL';
      component.btnAgree = 'FAVORITE.ALERT.BTN_AGREE';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._modelTransfer.fetchDeleteFavorite(data);
        this.modalService.close();
      });
    }
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._modelTransfer.optionModule$;
  }
}
