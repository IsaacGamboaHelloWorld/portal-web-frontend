import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { validateAsyncForm } from '@app/shared/helpers/validateData.helper';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ES } from '@core/constants/calendar';
import {
  DATE_FILTER,
  FILTER,
  RANGE,
} from '@modules/detail-product/constants/filter';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
// tslint:disable-next-line: component-class-suffix
export class DateComponentTable implements OnInit, OnDestroy {
  public minDate: Date;
  public maxDate: Date = new Date();
  public formDate: FormGroup;
  public typeActive: string = '';
  public filterOne: string = RANGE;
  public filterTwo: string = DATE_FILTER;
  public es: object = ES;
  public range: Array<{ name: string; value: string[] }> = FILTER;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() actionAgree: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private modalService: ModalService,
    public dialogConfig: DialogConfig,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.formDate
      .get('fromDate')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.formDate.controls['toDate'].setValue('');
        this.minDate = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public selectedOption(data: string): void {
    this.typeActive = data;
    if (data === RANGE) {
      this._resetValues();
      this._typeRange();
    } else {
      this._typeDate();
    }
    validateAsyncForm(this.formDate, data, DATE_FILTER, 'fromDate', [
      Validators.required,
    ]);
    validateAsyncForm(this.formDate, data, DATE_FILTER, 'toDate', [
      Validators.required,
    ]);
    validateAsyncForm(
      this.formDate,
      data,
      RANGE,
      'range',
      [Validators.required],
      false,
    );
  }

  public submitForm(): void {
    this.typeActive === RANGE ? this._isRange() : this._isDate();
    this.modalService.close();
  }

  public compareFnRange(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  private _initForm(): void {
    this.formDate = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(this.range[0], [Validators.required]),
    });
    this.typeActive = RANGE;
    this._disabledDate();
  }

  private _isRange(): void {
    const arr: object[] = this.dialogConfig.data;
    const filterDate = arr.filter((e) => {
      const attr = e['paymentDate'] ? e['paymentDate'] : e['date'];
      return (
        String(attr).substr(0, 10) >=
          String(this.formDate.value.range.value[0]).substr(0, 10) &&
        String(attr).substr(0, 10) <=
          String(this.formDate.value.range.value[1]).substr(0, 10)
      );
    });
    this.actionAgree.emit({
      hasFilter: Boolean(this.typeActive),
      data: filterDate,
      typeFilter: this.formDate.value.typeFilter,
      name: this.formDate.value.range.name,
      from: this.formDate.value.range.value[0],
      to: this.formDate.value.range.value[1],
    });
  }

  private _isDate(): void {
    const arr: object[] = this.dialogConfig.data;
    const filterDate = arr.filter((e) => {
      const attr = e['paymentDate'] ? e['paymentDate'] : e['date'];
      return (
        String(attr).substr(0, 10) >=
          String(this.formDate.value.fromDate.toISOString()).substr(0, 10) &&
        String(attr).substr(0, 10) <=
          String(this.formDate.value.toDate.toISOString()).substr(0, 10)
      );
    });
    this.actionAgree.emit({
      hasFilter: Boolean(this.typeActive),
      data: filterDate,
      typeFilter: this.formDate.value.typeFilter,
      name: '',
      from: this.formDate.value.fromDate.toISOString(),
      to: this.formDate.value.toDate.toISOString(),
    });
  }

  private _disabledDate(): void {
    this.formDate.controls['fromDate'].disable();
    this.formDate.controls['toDate'].disable();
  }

  private _resetValues(): void {
    this.formDate.controls['range'].setValue(this.range[0]);
    this.formDate.controls['fromDate'].setValue('');
    this.formDate.controls['toDate'].setValue('');
  }

  private _typeRange(): void {
    this.formDate.controls['range'].enable();
    this.formDate.controls['fromDate'].disable();
    this.formDate.controls['toDate'].disable();
  }

  private _typeDate(): void {
    this.formDate.controls['range'].disable();
    this.formDate.controls['fromDate'].enable();
    this.formDate.controls['toDate'].enable();
  }
}
