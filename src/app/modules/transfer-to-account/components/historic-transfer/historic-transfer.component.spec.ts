import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { HistoricTransferComponent } from 'app/modules/transfer-to-account/components/historic-transfer/historic-transfer.component';
import { TransferModelMock } from '../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { TransferModel } from '../../transfer.model';

describe('HistoricTransferComponent', () => {
  let component: HistoricTransferComponent;
  let fixture: ComponentFixture<HistoricTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CreateDateModule],
      declarations: [HistoricTransferComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
