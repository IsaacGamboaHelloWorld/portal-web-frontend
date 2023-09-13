import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { ModalCalendarComponent } from '../calendar/modal/modal-calendar/modal-calendar.component';
import { CardChangeDataComponent } from './card-change-data.component';

@Component({
  template: `
    <div [formGroup]="form">
      <input formControlName="id" />
    </div>
  `,
})
class TestComponent {
  public form: FormGroup = new FormGroup({
    id: new FormControl(undefined),
  });
}

describe('CardChangeDataComponent', () => {
  let component: CardChangeDataComponent;
  let fixture: ComponentFixture<CardChangeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardChangeDataComponent, ModalCalendarComponent],
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChangeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectOption with modalContact is true', () => {
    component.modalContact = true;
    component.visibleModal = true;
    component.property = '';
    const option = '' as any;

    component.selectOption(option);

    component.event.subscribe((result: any) => {
      expect(result).toEqual(option);
    });
    expect(component.visibleModal).toBeFalsy();
  });

  it('selectOption with modalContact is false', () => {
    component.modalContact = false;
    component.visibleModal = true;
    component.property = 'text';
    const option = 'mensaje de prueba' as any;

    component.form = new FormGroup({
      text: new FormControl(option),
    });

    component.selectOption(option);

    component.event.subscribe((result: any) => {
      expect(result).toEqual(option);
    });
    expect(component.visibleModal).toBeFalsy();
    expect(component.form.controls[component.property].value).toEqual(option);
  });

  it('emitCancel', () => {
    const data = {};
    component.visibleModal = true;
    component.emitCancel();
    expect(component.visibleModal).toBeFalsy();

    component.event.subscribe((result: any) => {
      expect(result).toEqual(data);
    });
  });

  it('ngOnInit with ifDefaultData and modalContact is true', () => {
    component.modalContact = true;
    component.ifDefaultData = { data: '' };
    component.property = 'text';
    const option = 'mensaje de prueba' as any;

    component.form = new FormGroup({
      text: new FormControl(option),
    });

    component.ngOnInit();
    expect(component.visibleModal).toEqual(component.modalContact);
  });
});
