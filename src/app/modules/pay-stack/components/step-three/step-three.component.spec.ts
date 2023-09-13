import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PayStackModelMock } from '../../../../../../test-helpers/mocks/models/payStack.model.mocks';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { StepThreeComponent } from './step-three.component';

describe('StepThreeComponent PayStack', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [StepThreeComponent, RemoveValuePipe],
      providers: [
        ManipulateDomService,
        {
          provide: PayStackModel,
          useClass: PayStackModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigatePayStack);
  });

  it('_setStep', () => {
    const step = 1;
    const model = TestBed.get(PayStackModel);
    const spy = spyOn(model, 'setStep');
    component._setStep(step);
    expect(spy).toHaveBeenCalledWith({ step });
  });

  it('ngOnInit', () => {
    component.formStepThree = new FormGroup({
      today: new FormControl(''),
      radio: new FormControl('0'),
      date: new FormControl(''),
    });
    const spyStep = spyOn(component as any, '_setStep');
    const spyForm = spyOn(component as any, '_initForm');
    const spySet = spyOn(component as any, 'setClass');

    component.ngOnInit();

    expect(spySet).toHaveBeenCalledWith('0');
    expect(spyForm).toHaveBeenCalled();
    expect(spyStep).toHaveBeenCalledWith(3);
  });

  it('_initForm', () => {
    component.formStepThree = new FormGroup({
      today: new FormControl(''),
      radio: new FormControl('0'),
      date: new FormControl(''),
    });
    (component as any)._initForm();
    expect(component.formStepThree.get('today').value).toEqual('');
    expect(component.formStepThree.get('radio').value).toEqual('0');
    expect(component.formStepThree.get('date').value).toEqual('');
  });

  it('selectedOption', () => {
    const name = 'name';
    component.selectedOption(name);
    expect(component.typeActive).toEqual(name);
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
    expect(spyAdd).toHaveBeenCalledWith('.type-pocket-' + step, 'active');
  });

  it('validFormThree for case 0', () => {
    const caseValue = '0';
    component.formStepThree = new FormGroup({
      today: new FormControl({}),
      radio: new FormControl(caseValue),
      date: new FormControl({}),
    });

    component.validFormThree();

    expect(component.valueDate).toEqual({});
  });

  it('submitFormThree', () => {
    component.formStepThree = new FormGroup({
      today: new FormControl(''),
      radio: new FormControl('0'),
      date: new FormControl(''),
    });

    const model = TestBed.get(PayStackModel);
    const spyDate = spyOn(model, 'setDate');
    const spyStep = spyOn(component, '_setStep');
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, 'navigate');

    component.submitFormThree();

    expect(spyDate).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith([component.navigate.step4]);
    expect(spyStep).toHaveBeenCalledWith(4);
  });

  it('formarDate', () => {
    const value = '2021/09/20';
    const result = component.formarDate(value);
    expect(result).toEqual('20/09/2021');
  });
});
