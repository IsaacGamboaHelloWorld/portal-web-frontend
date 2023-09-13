import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { TransferModelMock } from '../../../../../../../test-helpers/mocks/models/transfer.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { ModalDetailScheduledComponent } from './modal-detail-scheduled.component';

describe('ModalDetailScheduledComponent', () => {
  let component: ModalDetailScheduledComponent;
  let fixture: ComponentFixture<ModalDetailScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [ModalDetailScheduledComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        TranslateService,
        ModalService,
        ManipulateDomService,
        DialogConfig,
        {
          provide: TransferModel,
          useClass: TransferModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailScheduledComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
