import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { IBlockProduct } from '../../entities/block-product';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';

@Component({
  selector: 'app-popup-account-lock-confirmation',
  templateUrl: './popup-account-lock-confirmation.component.html',
  styleUrls: ['./popup-account-lock-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupAccountLockConfirmationComponent implements OnInit {
  public card: Product;

  constructor(
    private modal: ModalService,
    private model: BlockedProductsModel,
  ) {}

  ngOnInit(): void {}

  public submitForm(): void {
    const dataToSend: IBlockProduct = {
      accountId: this.card.accountInformation.accountIdentifier,
      accountType: this.card.accountInformation.productType,
      refType: 'TEMPORARY_LOCK',
    };
    this.modal.close();
    this.model.blockProduct(dataToSend);
  }

  public closeModal(): void {
    this.modal.close();
  }
}
