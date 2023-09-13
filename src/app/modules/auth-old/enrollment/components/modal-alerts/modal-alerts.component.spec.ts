import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { EventsService } from '@app/core/services/tag_manager/events.service';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { AuthModelMock } from '../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';

import { ModalAlertsComponent } from './modal-alerts.component';

describe('ModalAlertsComponent', () => {
  let component: ModalAlertsComponent;
  let fixture: ComponentFixture<ModalAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        ModalService,
        ManipulateDomService,
        EventsService,
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ModalAlertsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
