import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OnlyNumbersDirective } from './only-numbers.directive';

@Component({
  template: `
    <input type="text" appOnlyNumbers />
  `,
})
class TestOnlyNumbersComponent {}

describe('OnlyNumbersDirective', () => {
  let component: TestOnlyNumbersComponent;
  let fixture: ComponentFixture<TestOnlyNumbersComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOnlyNumbersComponent, OnlyNumbersDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestOnlyNumbersComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  }));

  it('should be validate return data', () => {
    inputEl.nativeElement.value = '123ñhola4';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('1234');
  });

  it('should be validate param null', () => {
    inputEl.nativeElement.value = '1234';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('1234');
  });
});
