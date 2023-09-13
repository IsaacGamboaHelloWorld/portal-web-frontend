import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricTransactionComponent } from '@app/shared/historic-transaction/components/historic-transaction/historic-transaction.component';

describe('HistoryTransactionComponent', () => {
  let component: HistoricTransactionComponent;
  let fixture: ComponentFixture<HistoricTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricTransactionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
