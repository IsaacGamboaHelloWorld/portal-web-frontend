import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { RechargeModelMock } from '../../../../../../test-helpers/mocks/models/recharge.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RechargeConfirmationComponent } from './recharge-confirmation.component';

describe('RechargeConfirmationComponent', () => {
  let component: RechargeConfirmationComponent;
  let fixture: ComponentFixture<RechargeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [RechargeConfirmationComponent],
      providers: [
        ModalService,
        {
          provide: RechargeModel,
          useClass: RechargeModelMock,
        },
        ManipulateDomService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
