import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '@app/core/models/products/product';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { IBlockProduct } from '../../entities/block-product';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';

@Component({
  selector: 'app-popup-card-lock-confirmationd',
  templateUrl: './popup-card-lock-confirmation.component.html',
  styleUrls: ['./popup-card-lock-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupCardLockConfirmationComponent implements OnInit {
  public typeBlock: FormGroup;
  public blocked: boolean = false;
  public card: Product;

  constructor(
    private modal: ModalService,
    private model: BlockedProductsModel,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.typeBlock = new FormGroup({
      whyBlock: new FormControl('', Validators.required),
    });
  }

  public submitForm(): void {
    const dataToSend: IBlockProduct = {
      accountId: this.card.accountInformation.accountIdentifier,
      accountType: this.card.accountInformation.productType,
      refType: this.typeBlock.controls.whyBlock.value,
    };
    this.modal.close();
    this.model.blockProduct(dataToSend);
  }

  setClass(_data: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass(_data, 'active');
    if (_data === '.why-container-1') {
      this.whyBlockAlias.setValue('LOSS_LOCK');
    } else {
      this.whyBlockAlias.setValue('DEFINITIVE_LOCK');
    }
  }

  get whyBlockAlias(): AbstractControl {
    return this.typeBlock.get('whyBlock');
  }
}
