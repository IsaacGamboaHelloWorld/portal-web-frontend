import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  IDepAcctTrnRec,
  ITransactionsByCard,
} from '../../entities/unusual-query-response.interface';

@Component({
  selector: 'app-card-unsual-operations',
  templateUrl: './card-unsual-operations.component.html',
  styleUrls: ['./card-unsual-operations.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardUnsualOperationsComponent implements OnInit {
  @Input() index: number = -1;
  @Input() operation: IDepAcctTrnRec;
  @Input() product: ITransactionsByCard;
  @Input() form: FormGroup;
  private _operationsInput: string = 'operations';

  @Output() eventTrnSelected: EventEmitter<IDepAcctTrnRec> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public checkItem($event: IDepAcctTrnRec): void {
    this.eventTrnSelected.emit($event);
  }

  public isChectedValue($event: IDepAcctTrnRec): boolean {
    const formValue: ITransactionsByCard[] = this.operationsAlias.value;
    const findOp = formValue.find(
      (i: ITransactionsByCard) => i.CardNum === this.product.CardNum,
    );
    if (!findOp) {
      return false;
    }
    const findElement = findOp.DepAcctTrnRec.find(
      (f: IDepAcctTrnRec) => f.TrnId === $event.TrnId,
    );
    return !!findElement;
  }

  get operationsAlias(): AbstractControl {
    return this.form.get(this._operationsInput);
  }
}
