import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TestingModule } from '../../../../../test-helpers/testing.module';

import { DsDropdownSelectComponent } from './ds-dropdown-select.component';

describe('DsDropdownSelectComponent', () => {
  let component: DsDropdownSelectComponent;
  let fixture: ComponentFixture<DsDropdownSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsDropdownSelectComponent],
      imports: [FormsModule, ReactiveFormsModule, TestingModule],
      providers: [ManipulateDomService, ModalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const options = [
      { label: 'soy 1', value: 1 },
      { label: 'soy 2', value: 2 },
    ];
    component.fixedOptions = options;
    component.ngOnInit();
    expect(JSON.stringify(options)).toEqual(JSON.stringify(component.options));
  });

  it('_setValueForm with property', () => {
    const value = 10;
    const property = 'first';
    component.form = new FormGroup({
      first: new FormControl(''),
    });
    component.property = property;
    const event = {
      value,
    };
    (component as any)._setValueForm(event);
    expect(component.form.controls[property].value).toEqual(value);
  });

  it('_setValueForm with subProperty', () => {
    const value = 10;
    const property = 'first';
    const subProperty = 'second';
    component.form = new FormGroup({
      first: new FormGroup({
        second: new FormControl(value),
      }),
    });
    component.property = property;
    component.subProperty = subProperty;
    const event = {
      value,
    };
    (component as any)._setValueForm(event);
    expect(
      component.form.controls[property]['controls'][subProperty].value,
    ).toEqual(value);
  });

  it('_defaultValue with property', () => {
    const value = '10';
    const property = 'first';
    const options = [{ label: 'Ten', value: '10' }];
    component.form = new FormGroup({
      first: new FormControl(value),
    });
    component.options = options;
    component.property = property;
    (component as any)._defaultValue();
    expect(component.form.controls[property].value).toEqual(value);
  });

  it('_defaultValue with subProperty', () => {
    const value = '10';
    const property = 'first';
    const subProperty = 'second';
    const options = [{ label: 'Ten', value: '10' }];
    component.options = options;
    component.form = new FormGroup({
      first: new FormGroup({
        second: new FormControl(value),
      }),
    });
    component.property = property;
    component.subProperty = subProperty;
    (component as any)._defaultValue();
    expect(
      component.form.controls[property]['controls'][subProperty].value,
    ).toEqual(value);
  });

  it('onChange', () => {
    const event = {
      selectedOption: true,
    };
    component.filled = false;
    component.onChange(event);
    component.onHideEmit.subscribe((result: any) => {
      expect(result).toBeTruthy();
    });
  });

  it('onShow', () => {
    component.isOpen = false;
    component.onShow();
    component.onShowEmit.subscribe((result: any) => {
      expect(result).toBeTruthy();
    });
  });

  it('onHide', () => {
    component.isOpen = true;
    component.onHide();
    component.onHideEmit.subscribe((result: any) => {
      expect(result).toBeFalsy();
    });
  });

  it('onClick', () => {
    const event = {};
    component.onClick(event);
    component.onClickEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('onFocus', () => {
    const event = {};
    component.onFocus(event);
    component.onFocusEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('onBlur', () => {
    const event = {};
    component.onBlur(event);
    component.onBlurEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('getPropertyAlias', () => {
    const first = new FormControl('dos');
    const form = new FormGroup({
      first,
    });
    component.form = form;
    component.property = 'first';
    const result = component.getPropertyAlias;
    expect(result).toEqual(first);
  });
});
