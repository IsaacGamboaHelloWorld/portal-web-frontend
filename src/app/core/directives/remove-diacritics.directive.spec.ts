import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RemoveDiacriticsDirective } from './remove-diacritics.directive';

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  template: `
    <input type="text" appRemoveDiacritics />
  `,
})
class TestRemoveSignComponent {}

describe('RemoveDiacriticsDirective', () => {
  let component: TestRemoveSignComponent;
  let fixture: ComponentFixture<TestRemoveSignComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRemoveSignComponent, RemoveDiacriticsDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestRemoveSignComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  }));

  it('should be validate return data', () => {
    inputEl.nativeElement.value = 'holá niño';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('hola nino');
  });

  it('should be validate param null', () => {
    inputEl.nativeElement.value = 'hola nino';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('hola nino');
  });
});
