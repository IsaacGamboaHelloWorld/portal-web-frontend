import {
  Component,
  EventEmitter,
  Input,
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

import { TranslateService } from '@ngx-translate/core';
import {
  DATE_FILTER,
  DEFAULT_RANGE,
  FILTER,
  RANGE,
} from '../../constants/filter';
import { FilterDateModel } from '../../table.interface';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filterDate.component.html',
  styleUrls: ['./filterDate.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterDateComponent implements OnInit, OnDestroy {
  public fromMinDate: Date;
  public fromMaxDate: Date = new Date();
  public toMinDate: Date;
  public toMaxDate: Date = new Date();
  public formDate: FormGroup;
  public typeActive: string = '';
  public filterOne: string = RANGE;
  public filterTwo: string = DATE_FILTER;
  public es: object = ES;
  public range: Array<{ name: string; value: string[] }> = FILTER;
  public textDateFilter: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() maxRange: number = DEFAULT_RANGE;
  @Output() actionAgree: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private modalService: ModalService,
    public dialogConfig: DialogConfig,
    private _translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.formDate
      .get('fromDate')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((fromDate) => {
        if (fromDate) {
          const newDate = new Date(fromDate);
          newDate.setDate(newDate.getDate() + this.maxRange);
          if (newDate <= this.toMaxDate) {
            this.toMaxDate = new Date(newDate);
            this.toMaxDate.setDate(newDate.getDate());
          }
        }
        this.formDate.controls['toDate'].setValue('');
        this.toMinDate = fromDate;
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
      this.textDateFilter = this._translate
        .instant(`DETAIL.FILTER.MAX_RANGE`)
        .replace('{{maxRange}}', this.maxRange + 1);
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
    // TODO: Validar filtro por datos ya cargados
    const arr: object[] = this.dialogConfig.data;
    const filterDate = arr.filter((e) => {
      const attr = e['CreatedDt'] ? e['CreatedDt'] : e['date'];
      return (
        String(attr).substr(0, 10) >=
          String(this.formDate.value.range.value[0]).substr(0, 10) &&
        String(attr).substr(0, 10) <=
          String(this.formDate.value.range.value[1]).substr(0, 10)
      );
    });
    const filterDateModel: FilterDateModel = {
      hasFilter: Boolean(this.typeActive),
      data: filterDate,
      typeFilter: this.formDate.value.typeFilter,
      name: this.formDate.value.range.name,
      from: this.formDate.value.range.value[0],
      to: this.formDate.value.range.value[1],
    };
    this.actionAgree.emit(filterDateModel);
  }

  private _isDate(): void {
    const arr: object[] = this.dialogConfig.data;
    const filterDate = arr.filter((e) => {
      const attr = e['CreatedDt'] ? e['CreatedDt'] : e['date'];
      return (
        String(attr).substr(0, 10) >=
          String(this.formDate.value.fromDate.toISOString()).substr(0, 10) &&
        String(attr).substr(0, 10) <=
          String(this.formDate.value.toDate.toISOString()).substr(0, 10)
      );
    });
    const filterDateModel: FilterDateModel = {
      hasFilter: Boolean(this.typeActive),
      data: filterDate,
      typeFilter: this.formDate.value.typeFilter,
      name: '',
      from: this.formDate.value.fromDate.toISOString(),
      to: this.formDate.value.toDate.toISOString(),
    };
    this.actionAgree.emit(filterDateModel);
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
