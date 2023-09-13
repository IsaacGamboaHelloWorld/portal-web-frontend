import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricErrorComponent } from '@modules/transfer-to-account/components/historic-error/historic-error.component';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

describe('PendingErrorComponent', () => {
  let component: HistoricErrorComponent;
  let fixture: ComponentFixture<HistoricErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HistoricErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
