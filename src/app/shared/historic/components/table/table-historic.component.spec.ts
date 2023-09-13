import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { TransferModelMock } from '../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { TableHistoricComponent } from './table-historic.component';

describe('TableHistoricComponent', () => {
  let component: TableHistoricComponent;
  let fixture: ComponentFixture<TableHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CreateDateModule],
      declarations: [TableHistoricComponent, RemoveValuePipe],
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
    fixture = TestBed.createComponent(TableHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleInfo', () => {
    component.showInfo = false;
    component.toggleInfo();
    expect(component.showInfo).toBeTruthy();
  });
});
