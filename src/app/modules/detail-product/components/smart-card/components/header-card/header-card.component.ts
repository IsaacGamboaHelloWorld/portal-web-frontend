import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { DetailProductModel } from '@app/modules/detail-product/detail-product.model';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
  ISendNicknames,
} from '@app/modules/detail-product/entities/nicknames';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../../../core/models/products/product';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderCardComponent implements OnInit {
  public form: FormGroup;
  public viewEdit: boolean = false;
  public action: string;
  public newNameProduct: string;
  @Input() info: Product;

  constructor(private _model: DetailProductModel) {}

  get hasData(): boolean {
    return !isNullOrUndefined(this.info);
  }

  get isTC(): boolean {
    return this.info.accountInformation.productType ===
      TYPE_ACCOUNTS.CREDIT_CARD
      ? true
      : false;
  }
  get nicknames$(): Observable<INicknamesAll> {
    return this._model.nicknames$;
  }

  get nicknamesCreate$(): Observable<IAnswerNicknamesCreate> {
    return this._model.nicknamesCreate$;
  }
  get nicknamesUpdate$(): Observable<IAnswerNicknamesUpdate> {
    return this._model.nicknamesUpdate$;
  }
  get nicknamesDelete$(): Observable<IAnswerNicknamesDelete> {
    return this._model.nicknamesDelete$;
  }

  get hasNicknames(): boolean {
    return !isNullOrUndefined(this.nicknames$);
  }

  ngOnInit(): void {
    this._initForm();
    this.setName();
  }

  public setName(): void {
    if (this.hasNicknames) {
      this._model.nicknamesAll();
      this.nicknames$.subscribe((data) => {
        if (data && data.nicknames) {
          let nickFound = [];
          nickFound = data.nicknames.filter(
            (e) =>
              e.accountId === this.info.accountInformation.accountIdentifier,
          );
          if (nickFound.length) {
            this.action = 'UPDATE';
            this.newNameProduct = nickFound[0]['name'];
            this.form.controls.name.setValue(nickFound[0]['name']);
          } else {
            this.action = 'CREATE';
          }
        }
      });
    }
  }

  public edit(): void {
    this.viewEdit = true;
    this.form.controls.name.setValue(
      this.newNameProduct
        ? this.newNameProduct
        : this.info.accountInformation.productName,
    );
  }

  public check(): void {
    const obj: ISendNicknames = {
      nickname: {
        name: this.form.value.name,
        type: 'PRODUCT',
        accountId: this.info.accountInformation.accountIdentifier,
        accountType: this.info.accountInformation.productType,
      },
    };
    switch (this.action) {
      case 'CREATE':
        this._model.nicknamesCreate(obj);
        this.nicknamesCreate$.subscribe((data) => {
          this.viewEdit = !data.success;
          this.newNameProduct = data.success
            ? this.form.value.name
            : this.info.accountInformation.productName;
          this.setName();
        });
        break;
      case 'UPDATE':
        obj.oldNickname = this.newNameProduct;
        this._model.nicknamesUpdate(obj);
        this.nicknamesUpdate$.subscribe((data) => {
          this.viewEdit = !data.success;
          this.newNameProduct = data.success
            ? this.form.value.name
            : this.info.accountInformation.productName;
          this.setName();
        });
        break;
      case 'DELETE':
        obj.nickname.name = this.newNameProduct;
        this._model.nicknamesDelete(obj);
        this.nicknamesDelete$.subscribe((data) => {
          this.viewEdit = !data.success;
          this._model.nicknamesAll();
          this.newNameProduct = this.info.accountInformation.productName;
        });
        break;
    }
  }

  public _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  public validText(event?: any): void {
    let text: string = event.replace(/[^a-zA-Z0-9Ññ ]/g, '');
    if (text.indexOf('ñ') >= 0) {
      text = text.replace(/ñ/g, 'n');
    }
    if (text.indexOf('Ñ') >= 0) {
      text = text.replace(/Ñ/g, 'N');
    }
    if (text === 'DELETE') {
      this.action = 'DELETE';
    }
    this.form.controls.name.setValue(text);
  }
}
