import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductModel } from '@modules/detail-product/detail-product.model';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RANGE } from '../../constants/filter';
import { FilterDateComponent } from './filter-date.component';

describe('FilterDateComponent', () => {
  let component: FilterDateComponent;
  let fixture: ComponentFixture<FilterDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDateComponent],
      imports: [TestingModule, ReactiveFormsModule, CalendarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: DetailProductModel,
          useClass: DetailProductModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDateComponent);
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
