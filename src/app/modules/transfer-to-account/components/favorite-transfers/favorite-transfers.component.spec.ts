import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { TransferModelMock } from '../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { FavoriteTransfersComponent } from './favorite-transfers.component';

describe('FavoriteTransfersComponent', () => {
  let component: FavoriteTransfersComponent;
  let fixture: ComponentFixture<FavoriteTransfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [FavoriteTransfersComponent],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
