import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalCalendarComponent implements OnInit, OnDestroy {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<object> = new EventEmitter<object>();
  @Input() formModal: FormGroup;
  @Input() propertySelect: string;
  @Input() propertyDate: string;
  @Input() propertyRepeat: string;
  @Input() optionTwo: string;
  @Input() dateDefault: Date;
  @Input() namePeriodicity: string;
  public options: object[] = [];
  public es: any;
  public typeActive: string;
  public minDate: Date;
  public dataCalendar: object = new Date();
  public boxSelect: string = 'DEFINED';
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };
    this.options$.subscribe((data) => {
      this.options = [];
      if (typeof data === 'object') {
        data.forEach((e, i) => {
          this.options = [
            ...this.options,
            {
              label: e['NAME'],
              value: { code: e['CODE'], label: e['NAME'] },
            },
          ];
        });
      }
    });
    setTimeout(() => {
      const minDate = new Date();
      this.minDate = new Date(minDate);
      this.minDate.setDate(minDate.getDate() + 1);
      this.dataCalendar = this.minDate;
      this.setSelect();
      if (this.formModal) {
        this.formModal.controls[this.propertyRepeat].setValidators(
          Validators.required,
        );
      }
      this.selectBox(this.boxSelect);
    }, 20);
  }
  get options$(): Observable<string[]> {
    return this.translate.get('TRANSFER.FORM_THREE.PERIODICITY');
  }
  public selectDate(dateCalendar: Date, nameOption: string): void {
    this.dateDefault = null;
    this.dataCalendar = dateCalendar;
    this.typeActive = nameOption;
  }
  public setSelect(): void {
    if (this.formModal && this.options.length) {
      this.dataCalendar = this.dateDefault
        ? this.dateDefault
        : this.dataCalendar;
      this.formModal.controls[this.propertyDate].setValue(this.dataCalendar);
      this.formModal.controls[this.propertySelect].setValue(
        this.options[0]['value']['code'],
      );
      this.namePeriodicity = this.options[0]['label'];
    }
  }
  public emitClick(): void {
    const obj = {
      dateCalendar: this.dataCalendar,
      typeActive: this.optionTwo,
      numberRepeat: validateData(
        this.formModal.value[this.propertyRepeat],
        null,
      ),
      namePeriodicity: this.namePeriodicity,
    };
    this.actionAgree.emit(obj);
  }

  public setData(data: object): void {
    this.namePeriodicity = data['label'];
    this.formModal.controls[this.propertySelect].setValue(data['code']);
  }

  public selectBox(event: string): void {
    this.boxSelect = event;
    if (this.propertyRepeat) {
      switch (event) {
        case 'DEFINED':
          this._setRepeatValidators([Validators.required]);
          break;
        case 'UNDEFINED':
          this._setRepeatValidators([]);
          this.formModal.controls[this.propertyRepeat].setValue(0);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.minDate = null;
    if (!!this.formModal) {
      this._setRepeatValidators([]);
    }
  }

  private _setRepeatValidators(validators: any[]): void {
    this.formModal.get(this.propertyRepeat).setValidators(validators);
    this.formModal.get(this.propertyRepeat).updateValueAndValidity();
  }
}
