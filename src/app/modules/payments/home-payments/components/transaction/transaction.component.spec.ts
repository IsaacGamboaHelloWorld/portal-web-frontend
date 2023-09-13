import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { status } from '@modules/payments/home-payments/constants/status';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { TransactionComponent } from './transaction.component';

describe('TransactionComponent in home payments', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CreateDateModule],
      declarations: [TransactionComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isSuccess is false', () => {
    component.transaction = null;
    const result = component.isSuccess;
    expect(result).toBeFalsy();
  });

  it('isSuccess is true', () => {
    component.transaction = {
      paymentStatus: status.SUCCESS,
    } as any;
    const result = component.isSuccess;
    expect(result).toBeTruthy();
  });

  it('hasDescription is false', () => {
    component.transaction = {
      description: '',
    } as any;
    const result = component.hasDescription;
    expect(result).toBeFalsy();
  });

  it('hasDescription is true', () => {
    component.transaction = {
      description: 'soy una descripcion',
    } as any;
    const result = component.hasDescription;
    expect(result).toBeTruthy();
  });

  it('toggleInfo', () => {
    component.showInfo = true;
    component.toggleInfo();
    expect(component.showInfo).toBeFalsy();
  });
});
