import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  IStockPeriod,
  IStocksAllParams,
  IStockType,
} from '@modules/home/entities/stocks.interface';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductActionsComponent implements OnInit {
  @Input() types: IStockType[] = [];
  @Input() periods: IStockPeriod[] = [];
  @Output() openModal: EventEmitter<IStocksAllParams> = new EventEmitter<
    IStocksAllParams
  >();

  public formActions: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  public actionButton(): void {
    const {
      value: { period, stockType },
    } = this.formActions;

    this.openModal.emit({
      period,
      stockType,
    });
  }

  private _initForm(): void {
    this.formActions = this.fb.group({
      period: ['', Validators.required],
      stockType: ['', Validators.required],
    });
  }
}
