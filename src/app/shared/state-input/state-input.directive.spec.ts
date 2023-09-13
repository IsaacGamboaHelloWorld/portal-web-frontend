import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StateInputDirective } from './state-input.directive';

@Component({
  template: `
    <input type="text" appStateInput />
  `,
})
class StateInputComponent {}

describe('StateInputDirective', () => {
  let component: StateInputComponent;
  let fixture: ComponentFixture<StateInputComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [StateInputComponent, StateInputDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(StateInputComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new StateInputDirective(null);
    expect(directive).toBeTruthy();
  });
});
