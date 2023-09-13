import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ES } from '@app/core/constants/calendar';
import {
  DATE,
  TODAY,
} from '@app/modules/transfer-to-account/constants/calendar';
import { Calendar } from 'primeng/calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { checkNested } from '../helpers/checkNested.helper';
import { validateData } from '../helpers/validateData.helper';
import { SMALL_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';
import { ModalCalendarComponent } from './modal/modal-calendar/modal-calendar.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, OnDestroy {
  public today: Date = new Date();
  public optionOne: string = TODAY;
  public optionTwo: string = DATE;
  public dataCalendar: object = new Date();
  public typeActive: string = 'TODAY';
  public dateSheduled: Date = null;
  public count: number = 0;
  public nRepeat: number = 0;
  public namePeriodicity: string = '';
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('calendar', null) select: Calendar;
  @Input() form: FormGroup;
  @Input() viewToday: boolean = true;
  @Input() viewCalendar: boolean = true;
  @Input() property1: string;
  @Input() property2: string;
  @Input() property3: string;
  @Input() property4: string;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.form.controls[this.property1].setValue(this.typeActive);
    this.form.controls[this.property2].setValue(this.today);
  }
  public setBorder(nameOption: string): void {
    this.count++;
    this.typeActive = nameOption;
    if (nameOption === 'DATE' && this.count === 1) {
      this.openAlert();
    } else {
      this.count = 0;
      this.nRepeat = 0;
      this.dateSheduled = null;
      this.form.controls[this.property2].setValue(null);
    }
  }

  get es(): object {
    return ES;
  }

  public selectDate(dateCalendar: Date, nameOption: string): void {
    this.dataCalendar = dateCalendar;
    this.typeActive = nameOption;
    this.form.controls[this.property1].setValue(this.typeActive);
    this.form.controls[this.property2].setValue(dateCalendar);
  }

  openAlert(): void {
    this.modalService.open(ModalCalendarComponent, false, `${SMALL_WIDTH}`);

    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.formModal = this.form;
      component.propertyDate = this.property2;
      component.propertySelect = this.property3;
      component.optionTwo = this.typeActive;
      component.dateDefault = this.dateSheduled;
      component.propertyRepeat = this.property4;

      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((data: object) => {
          this.dateSheduled = data['dateCalendar'];
          this.dataCalendar = data['dateCalendar'];
          this.typeActive = data['typeActive'];
          this.nRepeat = data['numberRepeat'];
          this.namePeriodicity = data['namePeriodicity'];
          this.form.controls[this.property1].setValue(this.typeActive);
          this.form.controls[this.property2].setValue(data['dateCalendar']);
          this.form.controls[this.property4].setValue(
            validateData(data['numberRepeat'], ''),
          );
          this.count = 0;
          this.modalService.close();
        });
    }
  }

  ngOnDestroy(): void {}
}
