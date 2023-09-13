import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { RechargeModelMock } from '../../../../../../test-helpers/mocks/models/recharge.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RechargeSuccessComponent } from './recharge-success.component';

describe('RechargeSuccessComponent', () => {
  let component: RechargeSuccessComponent;
  let fixture: ComponentFixture<RechargeSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [RechargeSuccessComponent],
      providers: [
        ModalService,
        {
          provide: RechargeModel,
          useClass: RechargeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formOne$', () => {
    const model = TestBed.get(RechargeModel);
    const result = component.formOne$;
    expect(result).toEqual(model.formOne$);
  });

  it('_resetDisabled', () => {
    component.disabled = true;
    (component as any)._resetDisabled();
    expect(component.disabled).toBeFalsy();
  });
});
