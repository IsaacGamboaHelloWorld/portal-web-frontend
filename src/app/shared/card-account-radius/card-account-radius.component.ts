import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductAccount } from './../../core/models/products/product-account';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';
import { ITypeCard, typeCardEnum } from './constants/type-card.enum';

@Component({
  selector: 'app-card-account-radius',
  templateUrl: './card-account-radius.component.html',
  styleUrls: ['./card-account-radius.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardAccountRadiusComponent implements OnInit {
  @Input() data: ProductAccount;
  @Input() index: number = -1;
  @Input() type: typeCardEnum = typeCardEnum.DEFAULT;
  @Input() text: string = '';
  @Input() form: FormGroup;
  @Input() property: string = '';
  @Input() loading: boolean = false;
  @Input()
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(active: boolean) {
    this._isActive = active;
    if (active) {
      this.setClass(this.index);
    }
  }
  private _isActive: boolean = false;

  @Output() setCardEmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() setDataEmit: EventEmitter<{
    data: any;
    index: number;
  }> = new EventEmitter<any>();

  constructor(private dom: ManipulateDomService) {}

  ngOnInit(): void {}

  public setClass(_index: number): void {
    this.dom.removeMultipleClass('.card-container-arb', 'active');
    this.dom.addClass(`.type-arb-${_index}`, 'active');
    this._setIndex(_index);
  }

  private _setIndex(_index: number): void {
    if (!this.form) {
      return;
    }
    this.form.controls[this.property].setValue(this.data);
    this.setCardEmit.emit(_index);
    this.setDataEmit.emit({ index: this.index, data: this.data });
  }

  get getTypeCard(): ITypeCard {
    return typeCardEnum;
  }
}
