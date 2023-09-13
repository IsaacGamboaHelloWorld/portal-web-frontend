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
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../test-helpers/testing.module';

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

describe('CalendarComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, RemoveValuePipe],
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
