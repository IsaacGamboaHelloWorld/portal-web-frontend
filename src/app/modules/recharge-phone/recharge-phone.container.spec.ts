import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RechargePhoneContainer } from 'app/modules/recharge-phone/recharge-phone.container';
import { RechargeModelMock } from '../../../../test-helpers/mocks/models/recharge.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';

describe('RechargePhoneComponent', () => {
  let component: RechargePhoneContainer;
  let fixture: ComponentFixture<RechargePhoneContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [RechargePhoneContainer],
      providers: [
        ModalService,
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: RechargeModel,
          useClass: RechargeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargePhoneContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
