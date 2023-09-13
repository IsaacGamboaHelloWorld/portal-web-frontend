import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { unusualOperationsQuerySuccess } from '../../../../../../test-helpers/mocks/data/unusual-operations.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { CardUnsualOperationsComponent } from './card-unsual-operations.component';

describe('CardUnsualOperationsComponent', () => {
  let component: CardUnsualOperationsComponent;
  let fixture: ComponentFixture<CardUnsualOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [CardUnsualOperationsComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUnsualOperationsComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      operations: new FormControl(
        unusualOperationsQuerySuccess.TransactionsByCard,
        Validators.required,
      ),
    });
    component.product = unusualOperationsQuerySuccess
      .TransactionsByCard[0] as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
