import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAlertFormThree } from '@app/modules/alerts/entities/alerts';
import { AlertsService } from '@app/modules/alerts/services/alerts.service';
import { AlertsMock } from '@app/modules/alerts/store/mocks/alerts.mock';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';

import { StepThreeComponent } from './step-three.component';

describe('StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepThreeComponent],
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
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setClass', () => {
    const step = '1';

    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass(step);

    expect(spyRemove).toHaveBeenCalledWith(
      '.form-radiobutton-contanier',
      'active',
    );
    expect(spyAdd).toHaveBeenCalledWith('.type-alert-' + step, 'active');
  });

  it('setClassTarget', () => {
    const step = '1';

    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClassTarget(step);

    expect(spyRemove).toHaveBeenCalledWith('.radio-image', 'active');
    expect(spyAdd).toHaveBeenCalledWith('.type-target-' + step, 'active');
  });

  it('submitData', () => {
    component.formTypeAlert = new FormGroup({
      type_alert: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
    });

    const stepThreeData: IAlertFormThree = {
      type_alert: component.formTypeAlert.value.product_type,
      target_user: component.formTypeAlert.value.target,
    };

    const facade = TestBed.get(AlertsModel);
    const spyFetch = spyOn(facade, 'fetchStepThree');
    component.submitData();

    expect(spyFetch).toHaveBeenCalledWith(stepThreeData);
  });

  it('basicData$', () => {
    const facade = TestBed.get(AlertsModel);
    const result = component.basicData$;
    expect(result).toEqual(facade.basicData$);
  });
});
