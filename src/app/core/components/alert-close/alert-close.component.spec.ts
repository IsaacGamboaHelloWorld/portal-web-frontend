import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { AlertCloseComponent } from '@core/components/alert-close/alert-close.component';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { RechargeModelMock } from '../../../../../test-helpers/mocks/models/recharge.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';

describe('RechargeAlertComponent', () => {
  let component: AlertCloseComponent;
  let fixture: ComponentFixture<AlertCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [AlertCloseComponent],
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
    fixture = TestBed.createComponent(AlertCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
