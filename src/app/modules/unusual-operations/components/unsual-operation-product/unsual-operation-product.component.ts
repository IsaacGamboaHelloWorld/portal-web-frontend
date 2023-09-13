import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  IDepAcctTrnRec,
  ITransactionsByCard,
} from '../../entities/unusual-query-response.interface';

@Component({
  selector: 'app-unsual-operation-product',
  templateUrl: './unsual-operation-product.component.html',
  styleUrls: ['./unsual-operation-product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsualOperationProductComponent implements OnInit {
  public page: number = 100; // Indexa por 100, ya que pueden llegar varios grupos de operaciones
  private isAllChecked: boolean = false;
  private _operationsInput: string = 'operations';
  private itemsSelected: IDepAcctTrnRec[] = [];

  @Input() product: ITransactionsByCard;
  @Input() indexOp: number = -1;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  public checkAll(_check: number): void {
    this.isAllChecked = !this.isAllChecked;
    // tslint:disable-next-line:prefer-conditional-expression
    if (!this.isAllChecked) {
      this.itemsSelected = [];
    } else {
      this.itemsSelected = [...this.product.DepAcctTrnRec];
    }
    this._setOperationInForm();
  }

  public trnSelected($event: IDepAcctTrnRec): void {
    const find = this.itemsSelected.find(
      (i: IDepAcctTrnRec) => i.TrnId === $event.TrnId,
    );
    if (!find) {
      this.itemsSelected.push($event);
    } else {
      this.itemsSelected = this.itemsSelected.filter(
        (i: IDepAcctTrnRec) => i.TrnId !== $event.TrnId,
      );
    }
    this._setOperationInForm();
  }

  private _setOperationInForm(): void {
    const formValues: ITransactionsByCard[] = this.operationsAlias.value;
    const otherFormValue = formValues.filter(
      (i: ITransactionsByCard) => i.CardNum !== this.product.CardNum,
    );
    const newCurrentValue = {
      ...this.product,
      DepAcctTrnRec: this.itemsSelected,
    };
    const formNewValues: ITransactionsByCard[] = [
      ...otherFormValue,
      newCurrentValue,
    ];
    this.operationsAlias.setValue(
      this.itemsSelected.length > 0 ? formNewValues : otherFormValue,
    );
  }

  get operationsAlias(): AbstractControl {
    return this.form.get(this._operationsInput);
  }
}
