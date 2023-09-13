import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { ContentFullConfigService } from '@app/shared/currency/contentFull-config.service';
import Cleave from 'cleave.js';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appCurrency]',
})
export class CurrencyDirective implements OnChanges, OnDestroy {
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() type: string;
  @Output() typeSelect: EventEmitter<string> = new EventEmitter<string>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private el: ElementRef,
    @Inject(ContentFullConfigService) private data: string,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !isNullOrUndefined(this.form) &&
      !isNullOrUndefined(this.property) &&
      !isNullOrUndefined(this.el)
    ) {
      this._emptyValue();
      this.form
        .get(this.property)
        .valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if (this.type === 'input_credit_card') {
            this._formatDataCreditCard(data);
          } else {
            this._formatData(data);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private _formatData(value: string): void {
    new Cleave(this.el.nativeElement, {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: '$ ',
      signBeforePrefix: true,
      rawValueTrimPrefix: true,
      numeralDecimalMark: ',',
      delimiter: '.',
      onValueChanged: (e: any) => {
        this.form.controls[this.property].setValue(e.target.rawValue, {
          emitEvent: false,
        });
        this.el.nativeElement.value = e.target.value;
      },
    });
  }

  private _formatDataCreditCard(value: string): void {
    const v: string = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match: string = (matches && matches[0]) || '';
    const parts = [];
    const len = match.length;
    for (let index = 0; index < len; index += 4) {
      parts.push(match.substring(index, index + 4));
    }
    let result = value;
    if (parts.length) {
      result = String(parts.join(' '));
      this.form.controls[this.property].setValue(result.replace(/\s/g, ''), {
        emitEvent: false,
      });
    }
    this.el.nativeElement.value = result;
  }

  private _emptyValue(): void {
    if (this.el.nativeElement.value !== '') {
      this._formatData(this.el.nativeElement.value);
    }
  }
}
