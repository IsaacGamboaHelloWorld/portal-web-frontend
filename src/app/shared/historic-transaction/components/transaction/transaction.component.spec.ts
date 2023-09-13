import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';

describe('TransactionComponent is Shared', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionComponent],
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

  it('hasData', () => {
    component.dataColumnOne = null;
    const result = component.hasData;
    expect(result).toBeFalsy();
  });

  it('isPending', () => {
    component.pending = null;
    const result = component.isPending;
    expect(result).toBeFalsy();
  });

  it('toggleInfo', () => {
    component.showInfo = true;
    component.toggleInfo();
    expect(component.showInfo).toBeFalsy();
  });
});
