import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { YourPlusModel } from '@app/modules/tu-plus/store/models/your-plus.model';
import { yourPlusHistoryMovementsMock } from '@root/test-helpers/mocks/data/your-plus.mock';
import { TuPlusModelMock } from '@root/test-helpers/mocks/models/tu-plus.model.mock';
import { PaymentsPSEMock } from '../../../../../../test-helpers/mocks/data/payment.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../core/pipes/remove-value.pipe';
import { CreateDateModule } from '../../../create-date/create-date.module';
import { HistoricMovementsRowComponent } from './historic-movements-row.component';

xdescribe('HistoricMovementsRowComponent', () => {
  let component: HistoricMovementsRowComponent;
  let fixture: ComponentFixture<HistoricMovementsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CreateDateModule],
      declarations: [HistoricMovementsRowComponent, RemoveValuePipe],
      providers: [
        {
          provide: YourPlusModel,
          useClass: TuPlusModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricMovementsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HistoricMovementsRowComponent', () => {
    expect(component).toBeTruthy();
  });

  it('hasData', () => {
    component.data = yourPlusHistoryMovementsMock.ListTransactions[0];
    const result = component.hasData;
    expect(result).toBeUndefined();
  });

  it('isSuccess', () => {
    component.data = PaymentsPSEMock.data[0] as any;
    const result = component.isSuccess;
    expect(result).toBeTruthy();
  });
});
