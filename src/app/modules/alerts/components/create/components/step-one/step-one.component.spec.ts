import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { A_SP, A_TC } from '@app/modules/alerts/entities/alerts';
import { AlertsService } from '@app/modules/alerts/services/alerts.service';
import { AlertsMock } from '@app/modules/alerts/store/mocks/alerts.mock';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { Navigate } from '@core/constants/navigate';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { StepOneComponent } from './step-one.component';

describe('StepOneComponent Alerts Module', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepOneComponent],
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
    fixture = TestBed.createComponent(StepOneComponent);
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

    expect(spyRemove).toHaveBeenCalledWith('.radio-image', 'active');
    expect(spyAdd).toHaveBeenCalledWith('.type-alert-' + step, 'active');
  });*/
  /*
  it('submitData', () => {
    component.formNewAlert = new FormGroup({
      alert_type: new FormControl('', Validators.required),
    });

    const facade = TestBed.get(AlertsModel);
    const spyFetch = spyOn(facade, 'fetchStepOne');
    const spyLoad = spyOn(component, 'loadData');

    component.submitData();

    expect(spyLoad).toHaveBeenCalledWith(
      component.formNewAlert.value.alert_type,
    );
    expect(spyFetch).toHaveBeenCalledWith({
      type_prod: component.formNewAlert.value.alert_type,
    });
    component.setStep.subscribe((result: number) => {
      expect(result).toEqual(2);
    });
  });
  */

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
