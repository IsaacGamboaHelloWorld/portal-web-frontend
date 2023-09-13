import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Movement } from '@core/models/movement/movement';
import { isNullOrUndefined } from 'util';

import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { TypeProduct } from '@core/interfaces/product_type.interface';
import { CreditCardMovementInterface } from '../../../../core/interfaces/creditCardMovement.interface';
import { Operation } from '../../../../core/models/movement/operations';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MovementsComponent implements OnInit {
  @Input() movements: Movement;
  @Input() cdtInfo: any;
  @Input() typeAccount: string;
  @Input() id: string;
  @Input()
  get textFilter(): string {
    return this._textFilter;
  }
  set textFilter(text: string) {
    this._textFilter = text;
    this.cutArray(10, this.currentPage);
  }

  private _textFilter: string;
  public account: TypeProduct = TYPE_ACCOUNTS;
  public isCDT: boolean = false;
  public currentPage: number = 1;
  public dataToPage: Operation[] | CreditCardMovementInterface[];

  constructor() {}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.movements)) {
      this.cutArray(10, this.currentPage);
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.cutArray(10, this.currentPage);
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.cutArray(10, this.currentPage);
  }

  public cutArray(howMany: number, page_number: number): void {
    page_number--;
    const list:
      | Operation[]
      | CreditCardMovementInterface[] = !isNullOrUndefined(
      this.movements.operations,
    )
      ? this.movements.operations
      : this.movements.creditCardMovements;

    if (!isNullOrUndefined(list) && list instanceof Array) {
      this.dataToPage = list.slice(
        page_number * howMany,
        (page_number + 1) * howMany,
      );
    }
  }

  get haveLess(): boolean {
    return this.currentPage === 1;
  }

  get haveMore(): boolean {
    return this.currentPage === this.totalPages;
  }

  get hasMovements(): boolean {
    if (this.typeAccount === 'certified_deposit_term') {
      this.isCDT = true;
    }
    return (
      !isNullOrUndefined(this.movements) || !isNullOrUndefined(this.cdtInfo)
    );
  }

  get totalPages(): number {
    switch (this.typeAccount) {
      case 'deposit_account':
      case 'current_account':
        const _totalPageOp = Math.ceil(this.movements.operations.length / 10);
        return this.currentPage > _totalPageOp
          ? this.currentPage
          : _totalPageOp;
      case 'credit_card':
        const _totalPageCard = Math.ceil(this.creditCardMovementsLength / 10);
        return this.currentPage > _totalPageCard
          ? this.currentPage
          : _totalPageCard;
      default:
        return 0;
    }
  }

  get totalRecords(): number {
    switch (this.typeAccount) {
      case 'deposit_account':
      case 'current_account':
        return this.movements.operations.length;
      case 'credit_card':
        return this.creditCardMovementsLength;
      default:
        return 0;
    }
  }

  get creditCardMovementsLength(): number {
    return !isNullOrUndefined(this.movements) &&
      !isNullOrUndefined(this.movements.creditCardMovements) &&
      this.movements.creditCardMovements.length > 0
      ? this.movements.creditCardMovements.length
      : 0;
  }
}
