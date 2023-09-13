import { formatNumber, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  LOCALE_ID,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { isNullOrUndefined } from 'util';

import { ContentFullConfigService } from '@app/shared/currency/contentFull-config.service';
import { CurrencyDirective } from '@app/shared/currency/currency.directive';

registerLocaleData(localeEs, 'es-CO');

@Component({
  template: `
    <form [formGroup]="form">
      <input
        type="text"
        appCurrency
        [form]="form"
        [property]="'amount'"
        formControlName="amount"
      />
    </form>
  `,
})
class TestComponent {
  public form: FormGroup = new FormGroup({
    amount: new FormControl(undefined),
  });
}

describe('CurrencyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CurrencyDirective, TestComponent],
      providers: [
        {
          provide: ContentFullConfigService,
          useValue: '',
        },
        {
          provide: LOCALE_ID,
          useValue: 'es-CO',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  }));

  it('should be validate undefined', () => {
    expect(replaceNumber(component.form.value.amount)).toBe('');
    inputEl.nativeElement.value = convertNumber(
      replaceNumber(component.form.value.amount),
    );
    fixture.detectChanges();

    setTimeout(() => {
      expect(inputEl.nativeElement.value).toBe('$ 0');
    }, 300);
  });
});

function convertNumber(data: string): any {
  return !isNullOrUndefined(data) ? `$ ${formatNumber(+data, 'es-CO')}` : '$ 0';
}

function replaceNumber(amount: string): string {
  return !isNullOrUndefined(amount)
    ? (amount + '').replace(/[^0-9]+/g, '')
    : '';
}
