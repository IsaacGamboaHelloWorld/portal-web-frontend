import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { ModalCalendarComponent } from './modal-calendar.component';

xdescribe('ModalCalendarComponent', () => {
  let component: ModalCalendarComponent;
  let fixture: ComponentFixture<ModalCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ModalCalendarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCalendarComponent);
    component = fixture.componentInstance;

    const propertyRepeat = 'propertyRepeat';
    const propertySelect = 'propertySelect';
    const propertyDate = 'propertyDate';

    component.propertyRepeat = propertyRepeat;
    component.propertySelect = propertySelect;
    component.propertyDate = propertyDate;

    component.formModal = new FormGroup({
      propertyRepeat: new FormControl(''),
      propertySelect: new FormControl(''),
      propertyDate: new FormControl(''),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectDate', () => {
    const date = new Date();
    const nameOption = 'nameOption';

    component.dateDefault = new Date();

    component.selectDate(date, nameOption);

    expect(component.dateDefault).toEqual(null);
    expect(component.dataCalendar).toEqual(date);
    expect(component.typeActive).toEqual(nameOption);
  });
});
