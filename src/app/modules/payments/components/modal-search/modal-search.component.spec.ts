import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IActiveCompanySave } from '@app/core/interfaces/paymentBills.interface';
import { PaymentModel } from '@modules/payments/payment.model';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { ModalSearchComponent } from './modal-search.component';

describe('ModalSearchComponent', () => {
  let component: ModalSearchComponent;
  let fixture: ComponentFixture<ModalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSearchComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        ModalService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doClear', () => {
    const event = {
      preventDefault: () => {},
    };
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'clearCompanyActive');

    component.textFilter = 'lalal';
    component.emptyState = false;
    component.stepOne = false;

    component.doClear(event);

    expect(component.textFilter).toEqual('');
    expect(component.emptyState).toBeTruthy();
    expect(component.stepOne).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('onChange', () => {
    const event = {};
    component.textFilter = '';
    component.emptyState = false;

    component.onChange(event);

    expect(component.emptyState).toBeTruthy();
  });

  it('onKeyUp called with textFilter empty', () => {
    component.textFilter = '';
    const event = {};
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'searchData');
    component.onKeyUp(event);
    expect(spy).not.toHaveBeenCalledWith(component.textFilter);
  });

  it('onKeyUp called with textFilter is not empty', () => {
    component.textFilter = 'searching';
    const event = {};
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'searchData');
    component.onKeyUp(event);
    expect(spy).toHaveBeenCalledWith(component.textFilter);
  });

  it('submitForm', () => {
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'fetchCompanyActive');

    const spyChange = spyOn(component, 'changeStepTwo');

    component.stepOne = false;
    component.stepTwo = false;
    component.textFilter = 'false';

    component.formSearch = new FormGroup({
      entity: new FormControl('', [Validators.required]),
    });

    component.submitForm();

    expect(spy).toHaveBeenCalledWith('');
    expect(component.stepOne).toBeTruthy();
    expect(component.textFilter).toEqual('');
    expect(spyChange).toHaveBeenCalled();
  });

  it('changeStepTwo', () => {
    const spy = spyOn(component as any, '_initSecondForm');
    component.changeStepTwo();
    expect(spy).toHaveBeenCalled();
  });

  xit('doRegister', () => {
    const model = TestBed.get(PaymentModel);
    const spy = spyOn(model, 'fetchNewService');

    component.tempCompany = {
      organizationId: 10,
    } as any;

    component.formAddService = new FormGroup({
      name_serv: new FormControl('', [Validators.required]),
      no_serv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    const newService: IActiveCompanySave = {
      company_code: component.tempCompany.organizationId,
      company_name: component.formAddService.controls.name_serv.value,
      billId: component.formAddService.controls.no_serv.value,
    };

    component.doRegister();

    expect(spy).toHaveBeenCalledWith(newService);
  });

  it('doClose', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'close');

    component.doClose();

    expect(spy).toHaveBeenCalled();
  });
});
