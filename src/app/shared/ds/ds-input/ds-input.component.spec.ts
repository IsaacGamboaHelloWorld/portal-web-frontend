import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { DsInputComponent } from './ds-input.component';

describe('DsInputComponent', () => {
  let component: DsInputComponent;
  let fixture: ComponentFixture<DsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsInputComponent],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      id: new FormControl(undefined),
    });
    component.property = 'id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setValueForm without form', () => {
    const value = 10;
    const event = {
      target: {
        value,
      },
    };
    component.form = undefined;
    (component as any).setValueForm(event);
  });

  it('setValueForm with property', () => {
    const value = 10;
    const property = 'first';
    component.form = new FormGroup({
      first: new FormControl(''),
    });
    component.property = property;
    const event = {
      target: {
        value,
      },
    };
    (component as any).setValueForm(event);
    expect(component.form.controls[property].value).toEqual(value);
  });

  it('setValueForm with subProperty', () => {
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
      target: {
        value,
      },
    };
    (component as any).setValueForm(event);
    expect(
      component.form.controls[property]['controls'][subProperty].value,
    ).toEqual(value);
  });

  it('defaultValue without form', () => {
    component.form = undefined;
    (component as any).defaultValue();
  });

  it('defaultValue with property', () => {
    const value = 10;
    const property = 'first';
    component.form = new FormGroup({
      first: new FormControl(value),
    });
    component.property = property;
    (component as any).defaultValue();
    expect(component.form.controls[property].value).toEqual(value);
  });

  it('defaultValue with subProperty', () => {
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
    (component as any).defaultValue();
    expect(
      component.form.controls[property]['controls'][subProperty].value,
    ).toEqual(value);
  });

  it('_checkType for default case', () => {
    const text = 'this is a waring';
    component.caption = text;
    component.typeInput = 'warning';
    (component as any)._checkType();
    expect(component.caption).toEqual(text);
  });

  it('onBlur', () => {
    const text = 'text for input';
    const event = {
      target: {
        value: text,
      },
    };

    const spyTyping = spyOn(component as any, '_onTyping');
    const spyFilled = spyOn(component as any, '_onFilled');

    component.onBlur(event);

    expect(spyTyping).toHaveBeenCalledWith(false);
    expect(spyFilled).toHaveBeenCalledWith(!!text);
  });

  it('keydown', () => {
    const event = {};
    component.keydown(event);
    component.keydownEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('keyup', () => {
    const event = {};
    component.keyup(event);
    component.keyupEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('keypress', () => {
    const event = {};
    component.keypress(event);
    component.keypressEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
  });

  it('valuechange', () => {
    const event = {
      target: {
        value: 'value',
      },
    };
    const spyTyping = spyOn(component as any, '_onTyping');
    component.valuechange(event);
    component.changesEmit.subscribe((result: any) => {
      expect(result).toEqual(event);
    });
    expect(spyTyping).toHaveBeenCalledWith(true);
  });

  it('_onFilled', () => {
    const spy = spyOn(component as any, '_changeClassForElement');
    (component as any)._onFilled(true);
    expect(spy).toHaveBeenCalledWith(true, 'filled');
  });

  it('_onTyping', () => {
    const spy = spyOn(component as any, '_changeClassForElement');
    (component as any)._onTyping(true);
    expect(spy).toHaveBeenCalledWith(true, 'ds-typing');
  });

  it('_getInputElement with nativeElement', () => {
    const input = {
      nativeElement: {
        value: 'soy un valor',
      },
    };
    component.dsInput = input;
    const result = (component as any)._getInputElement();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(input.nativeElement));
  });

  it('_getInputElement without nativeElement', () => {
    const input = {};
    component.dsInput = input as any;
    const result = (component as any)._getInputElement();
    expect(result).toEqual(undefined);
  });

  it('clickIcon', () => {
    component.clickIcon();
    component.eventIcon.subscribe((data: any) => {
      expect(data).toEqual(undefined);
    });
  });

  it('_changeClassForElement with input true', () => {
    const spy = spyOn((component as any)._getInputElement().classList, 'add');
    (component as any)._changeClassForElement(true, 'filled');
    expect(spy).toHaveBeenCalledWith('filled');
  });

  it('_changeClassForElement with input false', () => {
    const spy = spyOn(
      (component as any)._getInputElement().classList,
      'remove',
    );
    (component as any)._changeClassForElement(false, 'filled');
    expect(spy).toHaveBeenCalledWith('filled');
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
