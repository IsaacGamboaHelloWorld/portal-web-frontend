import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { RANGE } from '@app/modules/detail-product/constants/filter';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductModel } from '@modules/detail-product/detail-product.model';
import { PaymentsPSEMock } from '../../../../../../test-helpers/mocks/data/payment.mock';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { DialogConfigMock } from '../../../../../../test-helpers/mocks/models/dialog-popup-block.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DateComponentTable } from './date.component';

describe('DateComponentTable', () => {
  let component: DateComponentTable;
  let fixture: ComponentFixture<DateComponentTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponentTable, RemoveValuePipe],
      imports: [TestingModule, ReactiveFormsModule, CalendarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: DetailProductModel,
          useClass: DetailProductModelMock,
        },
        {
          provide: DialogConfig,
          useClass: DialogConfigMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponentTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectedOption with FILTER as input', () => {
    const input = RANGE;

    const spyReset = spyOn(component as any, '_resetValues');
    const spRange = spyOn(component as any, '_typeRange');

    component.selectedOption(input);

    expect(spyReset).toHaveBeenCalled();
    expect(spRange).toHaveBeenCalled();
  });

  it('selectedOption with empty input', () => {
    const input = '';

    const spyDate = spyOn(component as any, '_typeDate');

    component.selectedOption(input);

    expect(spyDate).toHaveBeenCalled();
  });

  it('submitForm call isRange', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const spyRange = spyOn(component as any, '_isRange');

    component.typeActive = RANGE;

    component.submitForm();

    expect(spyRange).toHaveBeenCalled();
    expect(spyClose).toHaveBeenCalled();
  });

  it('_isRange with paymentDate > input', () => {
    component.formDate = new FormGroup({
      fromDate: new FormControl(new Date('2020-02-19')),
      toDate: new FormControl(new Date('2021-02-19')),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(component.range[0], [Validators.required]),
    });

    component.dialogConfig.data = PaymentsPSEMock.data;

    (component as any)._isRange();

    const resp = {
      hasFilter: true,
      data: [],
      typeFilter: 'range',
      name: 'Hoy',
      from: '2020-02-19T00:00:00.000Z',
      to: '2021-02-19T00:00:00.000Z',
    };
    component.actionAgree.subscribe((data: any) => {
      expect(data).toEqual(resp);
    });
  });

  it('_isDate with paymentDate > input', () => {
    component.formDate = new FormGroup({
      fromDate: new FormControl(new Date('2020-02-19')),
      toDate: new FormControl(new Date('2021-02-19')),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(component.range[0], [Validators.required]),
    });

    component.dialogConfig.data = PaymentsPSEMock.data;

    (component as any)._isDate();

    const resp = {
      hasFilter: true,
      data: PaymentsPSEMock.data,
      typeFilter: 'range',
      name: '',
      from: '2020-02-19T00:00:00.000Z',
      to: '2021-02-19T00:00:00.000Z',
    };

    component.actionAgree.subscribe((data: any) => {
      expect(data).toEqual(resp);
    });
  });

  it('_resetValues', () => {
    component.formDate = new FormGroup({
      fromDate: new FormControl('2020-02-19'),
      toDate: new FormControl('2021-02-19'),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(component.range[0], [Validators.required]),
    });

    (component as any)._resetValues();

    expect(component.formDate.controls['range'].value).toEqual(
      component.range[0],
    );
    expect(component.formDate.controls['fromDate'].value).toEqual('');
    expect(component.formDate.controls['toDate'].value).toEqual('');
  });

  it('_typeRange', () => {
    component.formDate = new FormGroup({
      fromDate: new FormControl('2020-02-19'),
      toDate: new FormControl('2021-02-19'),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(component.range[0], [Validators.required]),
    });

    (component as any)._typeRange();

    expect(component.formDate.controls['range'].enabled).toBeTruthy();
    expect(component.formDate.controls['fromDate'].disabled).toBeTruthy();
    expect(component.formDate.controls['toDate'].disabled).toBeTruthy();
  });

  it('_typeDate', () => {
    component.formDate = new FormGroup({
      fromDate: new FormControl('2020-02-19'),
      toDate: new FormControl('2021-02-19'),
      typeFilter: new FormControl(RANGE, [Validators.required]),
      range: new FormControl(component.range[0], [Validators.required]),
    });

    (component as any)._typeDate();

    expect(component.formDate.controls['range'].disabled).toBeTruthy();
    expect(component.formDate.controls['fromDate'].enabled).toBeTruthy();
    expect(component.formDate.controls['toDate'].enabled).toBeTruthy();
  });
});
