import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Navigate } from '@app/core/constants/navigate';
import { A_SP, A_TC } from '@app/modules/alerts/entities/alerts';
import { AlertsService } from '@app/modules/alerts/services/alerts.service';
import { AlertsMock } from '@app/modules/alerts/store/mocks/alerts.mock';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { StepTwoComponent } from './step-two.component';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepTwoComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: AlertsModel,
          useClass: AlertsMock,
        },
        AlertsService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('setClass', () => {
    const step = '1';

    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass(step);

    expect(spyRemove).toHaveBeenCalledWith(
      '.form-radiobutton-contanier',
      'active',
    );
    expect(spyAdd).toHaveBeenCalledWith('.type-' + step, 'active');
  });*/

  it('setClassTarget', () => {
    const step = '1';

    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClassTarget(step);

    expect(spyRemove).toHaveBeenCalledWith('.radio-image', 'active');
    expect(spyAdd).toHaveBeenCalledWith('.type-target-' + step, 'active');
  });

  /*it('submitData', () => {
    component.formServiceAlert = new FormGroup({
      product_type: new FormControl('', Validators.required),
      target: new FormControl(''),
    });

    const stepTwoData: IAlertFormTwo = {
      select_product: component.formServiceAlert.value.product_type,
    };

    const facade = TestBed.get(AlertsModel);
    const spyFetch = spyOn(facade, 'fetchStepTwo');

    component.submitData();

    expect(spyFetch).toHaveBeenCalledWith(stepTwoData);
    component.setStep.subscribe((result: any) => {
      expect(result).toEqual(3);
    });
  });*/

  it('retry when retryTimes > 0', () => {
    component.retryTimes = 5;
    component.typeAlert = 'warning';

    const facade = TestBed.get(AlertsModel);
    const spyClearBills = spyOn(facade, 'clearAllBills');
    const spyClearFinancial = spyOn(facade, 'clearAllFinancialOps');
    const spyLoad = spyOn(component, 'loadData');
    const spyTry = spyOn(component as any, '_tryOne');

    component.retry();

    expect(spyClearBills).toHaveBeenCalled();
    expect(spyClearFinancial).toHaveBeenCalled();
    expect(spyLoad).toHaveBeenCalledWith('warning');
    expect(spyTry).toHaveBeenCalled();
  });

  it('retry when retryTimes <= 0', () => {
    component.retryTimes = 0;

    component.retry();

    component.setStep.subscribe((result: number) => {
      expect(result).toEqual(1);
    });
  });

  it('loadData with A_TC', () => {
    const facade = TestBed.get(AlertsModel);
    const spyFinancial = spyOn(facade, 'fetchAllFinancialOps');

    component.loadData(A_TC);

    expect(spyFinancial).toHaveBeenCalled();
  });

  it('loadData with A_SP', () => {
    const facade = TestBed.get(AlertsModel);
    const spyBills = spyOn(facade, 'fetchAllBills');

    component.loadData(A_SP);

    expect(spyBills).toHaveBeenCalled();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });
});
