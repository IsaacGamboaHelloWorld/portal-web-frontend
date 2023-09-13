import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ProductsMock } from '../../../../../../../../test-helpers/mocks/data/products.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { PublicServicesFacade } from '../../../public-services.facade';
import { UtilsService } from '../../../transversal/utils.service';

import { PaymentServiceFacade } from '../../payment.facade';
import { NavigatePayment } from '../navigate/routes';
import { PaymentStepOneComponent } from './step-one.component';

describe('PaymentStepOneComponent SP', () => {
  let component: PaymentStepOneComponent;
  let fixture: ComponentFixture<PaymentStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule, FormsModule],
      declarations: [PaymentStepOneComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        UtilsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStepOneComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(component as any, '_initForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('_initForm', () => {
    component.formStart = new FormGroup({
      account_origin: new FormControl('', Validators.required),
      service_destination: new FormControl('', Validators.required),
    });
    (component as any)._initForm();

    expect(component.formStart.get('account_origin').value).toEqual('');
    expect(component.formStart.get('service_destination').value).toEqual('');
  });

  it('trackByFn', () => {
    const data = {
      ...ProductsMock.DEPOSIT_ACCOUNT[0],
      id: '1',
    };

    const result = component.trackByFn(0, data);

    expect(result).toEqual('1');
  });

  it('submitData', () => {
    component.formStart = new FormGroup({
      account_origin: new FormControl('', Validators.required),
      service_destination: new FormControl('', Validators.required),
    });
    const facade = TestBed.get(PaymentServiceFacade);
    const spy = spyOn(facade, 'setFormOne');

    component.submitData();

    expect(spy).toHaveBeenCalled();
  });

  it('activePayment$', () => {
    const result = component.activePayment$;
    const facade = TestBed.get(PaymentServiceFacade);
    expect(result).toEqual(facade.selectActiveProduct$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigatePayment);
  });

  it('productDefault$', () => {
    const util = TestBed.get(UtilsService);
    const result = component.productDefault$;
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(util.productDefault$),
    );
  });
});
